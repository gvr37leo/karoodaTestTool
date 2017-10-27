using karoodaTestToolServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace karoodaTestToolServer.DAL {
    public class StepDAL : AbstractDAL<Step> {
        public override string getTableName() {
            return "Step";
        }

        public override List<Column> getColumns() {
            return new List<Column> {
                new Column("functionPointer",DataType.number),
                new Column("belongsToTestcase", DataType.number),
                new Column("stepOrder", DataType.number)
            };
        }
    }
}