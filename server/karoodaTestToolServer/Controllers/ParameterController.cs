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

        public override string getPostString() {
            return $"INSERT INTO {getTableName()} (name) VALUES (@name)";
        }

        public override string getUpdateString() {
            return $"UPDATE {getTableName()} SET name=@name WHERE id=@id";
        }
    }

    public class ParameterController : AbstractController<ParameterDef> {
        public override AbstractDAL<ParameterDef> DALGetter() {
            return new ParameterDAL();
        }
    }
}
