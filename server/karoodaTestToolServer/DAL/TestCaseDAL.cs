using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace karoodaTestToolServer.DAL {
    public class TestCaseDAL : AbstractDAL<TestCase> {

        public override string getTableName() {
            return "TestCase";
        }

        public override List<Column> getColumns() {
            return new List<Column> {
                new Column("name", DataType.text)
            };
        }
    }
}