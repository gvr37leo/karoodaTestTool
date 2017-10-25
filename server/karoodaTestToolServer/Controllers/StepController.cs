using GorillaIT.DbUtils;
using GorillaIT.DbUtils.MsSqlUtils;
using karoodaTestToolServer.Controllers;
using karoodaTestToolServer.Models;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Http;
using System;

namespace karoodaTestToolServer.Controllers {

    public class StepDAL : AbstractDAL<Step> {
        public override string getTableName() {
            return "Step";
        }

        public override List<string> getColumns() {
            return new List<string> { "functionPointer", "belongsToTestcase", "stepOrder" };
        }
    }

    public class StepController : AbstractController<Step> {
        public override AbstractDAL<Step> DALGetter() {
            return new StepDAL();
        }
    }
}
