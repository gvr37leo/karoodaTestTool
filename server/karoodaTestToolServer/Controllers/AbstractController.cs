using Dapper;
using GorillaIT.DbUtils.MsSqlUtils;
using karoodaTestToolServer.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace karoodaTestToolServer.Controllers{

    public class Filter {
        public List<FilterEntry> filterEntrys = new List<FilterEntry>();
    }

    public class FilterEntry {
        public string field;
        public string value;

        public FilterEntry(string field, string value) {
            this.field = field;
            this.value = value;
        }
    }

    public class Column {
        public string name;
        public DataType dataType;

        public Column(string name, DataType dataType) {
            this.name = name;
            this.dataType = dataType;
        }
    }

    public enum DataType{
        number,text
    }

    public abstract class AbstractDAL<T> {
        private MsSqlUtils _sqlUtils;
        public abstract string getTableName();
        public abstract List<Column> getColumns();

        public AbstractDAL() {
            _sqlUtils = new MsSqlUtils(ConfigurationManager.ConnectionStrings["SQLCon"].ConnectionString);
        }

        public List<T> Get(Filter filter) {
            Dictionary<string, Column> columns = getColumns().ToDictionary(p => p.name);

            if (filter.filterEntrys.Count() == 0) {
                return _sqlUtils.Query<T>($"SELECT * FROM {getTableName()}").ToList();
            } else {//errors when all fields are invalid
                string query = $"SELECT * FROM {getTableName()} WHERE ";
                List<string> filterValues = new List<string>();

                foreach(FilterEntry filterEntry in filter.filterEntrys) {
                    if (filterEntry.field == "id") {
                        filterValues.Add($"{filterEntry.field}={filterEntry.value}");//sql injection: filterentry.value comes from client
                    } else if(columns.ContainsKey(filterEntry.field)) {
                        switch (columns[filterEntry.field].dataType){
                            case DataType.number: {
                                    filterValues.Add($"{filterEntry.field}={filterEntry.value}");
                                    break;
                                }
                            case DataType.text: {
                                    filterValues.Add($"{filterEntry.field}='{filterEntry.value}'");
                                    break;
                                }
                        }
                    }
                }

                query += String.Join(",",filterValues);
                return _sqlUtils.Query<T>(query).ToList();
            }
        }

        public int Insert(T entity) {
            string query = $"INSERT INTO {getTableName()} ({String.Join(",", getColumns().Select(col => col.name))}) VALUES ({postString()})";
            return _sqlUtils.Execute(query, entity);
        }

        public int Update(T entity) {
            string query = $"UPDATE {getTableName()} SET {updatestring()} WHERE id=@id";
            return _sqlUtils.Execute(query, entity);
        }

        public int Delete(int id) {
            string query = $"delete from {getTableName()} WHERE id=@id";
            return _sqlUtils.Execute(query, id);
        }







        private string postString() {
            return String.Join(",", getColumns().Select((column) => $"@{column.name}")); 
        }

        private string updatestring() {
            List<string> cols = new List<string>();
            foreach (Column column in getColumns()) {
                cols.Add($"{column.name}=@{column.name}");
            }
            return String.Join(",", cols);
        }

    }

    public abstract class AbstractController<T> : ApiController{
        [ApiExplorerSettings(IgnoreApi = true)]
        public abstract AbstractDAL<T> DALRetriever();
        protected AbstractDAL<T> DAL;

        public AbstractController() {
            DAL = DALRetriever();
        }

        //[HttpGet]
        //public IHttpActionResult Get() {
        //    return Ok(DAL.Get());
        //}

        [HttpPost]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult GetFiltered(Filter filter) {
            return Ok(DAL.Get(filter));
        }

        [HttpPost]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Post(T entity) {
            return check(DAL.Insert(entity));
        }

        [HttpPut]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Put(T entity) {
            return check(DAL.Update(entity));
        }

        [HttpDelete]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Delete(int id) {
            return check(DAL.Delete(id));
        }

        private IHttpActionResult check(int affectedRows) {
            if (affectedRows == 1) {
                return Ok();
            } else {
                return NotFound();
            }
        }
    }

    
}
