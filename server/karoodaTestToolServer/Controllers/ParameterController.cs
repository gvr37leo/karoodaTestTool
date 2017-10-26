using karoodaTestToolServer.Controllers;
using karoodaTestToolServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace karoodaTestToolServer.Controllers{
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

    public class ParameterController : AbstractController<ParameterDef> {
        public override AbstractDAL<ParameterDef> DALRetriever() {
            return new ParameterDAL();
        }
    }
}
