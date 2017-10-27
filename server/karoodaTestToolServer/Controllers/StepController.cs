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
using System.Web.Http.Cors;

namespace karoodaTestToolServer.Controllers {
    public class StepController : AbstractController<Step> {
        public override AbstractDAL<Step> DALRetriever() {
            return new StepDAL();
        }

        [HttpPost]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public new IHttpActionResult Post(Step entity) {

            DAL.Insert(entity);

            return Ok();
        }
    }
}
