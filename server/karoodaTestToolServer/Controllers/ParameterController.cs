using karoodaTestToolServer.Controllers;
using karoodaTestToolServer.DAL;
using karoodaTestToolServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace karoodaTestToolServer.Controllers{
    

    public class ParameterController : AbstractController<ParameterDef> {
        public override AbstractDAL<ParameterDef> DALRetriever() {
            return new ParameterDAL();
        }
    }
}
