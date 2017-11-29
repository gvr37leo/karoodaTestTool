using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using karoodaTestToolServer.DAL;
using karoodaTestToolServer.Models;

namespace karoodaTestToolServer.Controllers {
    public class ResultController : AbstractController<Result> {
        public override AbstractDAL<Result> DALRetriever() {
            return new ResultDAL();
        }
    }
}