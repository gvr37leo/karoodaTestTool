﻿using GorillaIT.DbUtils;
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

        public override string getPostString() {
            return $"INSERT INTO {getTableName()} (name) VALUES (@name)";
        }

        public override string getUpdateString() {
            return $"UPDATE {getTableName()} SET name=@name WHERE id=@id";
        }
    }

    public class StepController : AbstractController<Step> {
        public override AbstractDAL<Step> DALGetter() {
            return new StepDAL();
        }
    }
}
