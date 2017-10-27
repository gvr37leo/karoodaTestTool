using GorillaIT.DbUtils.MsSqlUtils;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace karoodaTestToolServer.DAL {
    public enum DataType {
        number, text
    }

    public interface IToDynamicObject {
        object ToObject();
        object ToObjectWithID();
    }

    public class Column {
        public string name;
        public DataType dataType;

        public Column(string name, DataType dataType) {
            this.name = name;
            this.dataType = dataType;
        }
    }
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

    public abstract class AbstractDAL<T> where T : IToDynamicObject {
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

                foreach (FilterEntry filterEntry in filter.filterEntrys) {
                    if (filterEntry.field == "id") {
                        filterValues.Add($"{filterEntry.field}={filterEntry.value}");//sql injection: filterentry.value comes from client
                    } else if (columns.ContainsKey(filterEntry.field)) {
                        switch (columns[filterEntry.field].dataType) {
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

                query += String.Join(",", filterValues);
                return _sqlUtils.Query<T>(query).ToList();
            }
        }

        public int Insert(T entity) {
            string query = $"INSERT INTO {getTableName()} ({String.Join(",", getColumns().Select(col => col.name))}) VALUES ({postString()})";
            return _sqlUtils.Execute(query, entity.ToObject());
        }

        public int Update(T entity) {
            string query = $"UPDATE {getTableName()} SET {updatestring()} WHERE id=@id";
            return _sqlUtils.Execute(query, entity.ToObjectWithID());
        }

        public int Delete(int id) {
            string query = $"delete from {getTableName()} WHERE id=@id";
            return _sqlUtils.Execute(query, new { id });
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
}