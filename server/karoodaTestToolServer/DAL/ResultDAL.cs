using karoodaTestToolServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace karoodaTestToolServer.DAL {
    public class ResultDAL : AbstractDAL<Result>{

        public override List<Column> getColumns() {
            return new List<Column> {
                new Column("startDate",DataType.number),
                new Column("result", DataType.text),
                new Column("belongsToTestcase", DataType.number),
                new Column("successfull",DataType.boolean)
            };
        }

        public override string getTableName() {
            return "Result";
        }
    }
}