using GorillaIT.DbUtils;
using GorillaIT.DbUtils.MsSqlUtils;
using karoodaTestToolServer.Controllers;
using karoodaTestToolServer.Models;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Http;
using System;
using karoodaTestToolServer.DAL;

namespace karoodaTestToolServer.Controllers {

    

    public class StepController : AbstractController<Step> {
        public override AbstractDAL<Step> DALRetriever() {
            return new StepDAL();
        }
    }
}
