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

        public override List<string> getColumns() {
            return new List<string> { "type", "name", "value", "belongsToStep" };
        }
    }

    public class ParameterController : AbstractController<ParameterDef> {
        public override AbstractDAL<ParameterDef> DALGetter() {
            return new ParameterDAL();
        }
    }
}
