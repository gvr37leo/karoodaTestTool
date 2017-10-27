using karoodaTestToolServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace karoodaTestToolServer.DAL {
    public class ParameterDAL : AbstractDAL<ParameterDef> {
        public override string getTableName() {
            return "Parameter";
        }

        public override List<Column> getColumns() {
            return new List<Column> {
                new Column("type", DataType.number),
                new Column("name", DataType.text),
                new Column("value", DataType.text),
                new Column("belongsToStep", DataType.number)
            };
        }
    }
}