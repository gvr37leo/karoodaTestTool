using GorillaIT.DbUtils.MsSqlUtils;
using karoodaTestToolServer.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace karoodaTestToolServer.Controllers
{
    public abstract class AbstractDAL<T> {
        private MsSqlUtils _sqlUtils;
        public abstract string getTableName();
        public abstract List<string> getColumns();

        public AbstractDAL() {
            _sqlUtils = new MsSqlUtils(ConfigurationManager.ConnectionStrings["SQLCon"].ConnectionString);
        }




        public List<T> Get() {
            return _sqlUtils.Query<T>($"SELECT * FROM {getTableName()}").ToList();
        }

        public int Insert(T entity) {
            return _sqlUtils.Execute($"INSERT INTO {getTableName()} ({String.Join(",", getColumns())}) VALUES ({postString()})", entity);
        }

        public int Update(T entity) {
            return _sqlUtils.Execute($"UPDATE {getTableName()} SET {updatestring()} WHERE id=@id", entity);
        }

        public int Delete(int id) {
            return _sqlUtils.Execute($"delete from {getTableName()} WHERE id=@id", id);
        }







        private string postString() {
            return String.Join(",", getColumns().Select((column) => $"@{column}")); 
        }

        private string updatestring() {
            List<string> cols = new List<string>();
            foreach (string column in getColumns()) {
                cols.Add($"{column}=@{column}");
            }
            return String.Join(",", cols);
        }

    }

    public abstract class AbstractController<T> : ApiController{
        public abstract AbstractDAL<T> DALGetter();
        private AbstractDAL<T> DAL;

        public AbstractController() {
            DAL = DALGetter();
        }

        [HttpGet]
        public IHttpActionResult Get() {
            return Ok(DAL.Get());
        }

        [HttpPost]
        public IHttpActionResult Post(T entity) {
            return check(DAL.Insert(entity));
        }

        [HttpPut]
        public IHttpActionResult Put(T entity) {
            return check(DAL.Update(entity));
        }

        [HttpDelete]
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
