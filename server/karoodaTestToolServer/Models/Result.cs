using karoodaTestToolServer.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace karoodaTestToolServer.Models {
    public class Result : IToDynamicObject {
        public int id;
        public int belongsToTestcase;
        public int startDate;
        public bool successfull;
        public string result = "";

        public Result() {

        }

        public Result(int belongsToTestcase, int startDate,bool successfull) {
            this.startDate = startDate;
            this.belongsToTestcase = belongsToTestcase;
            this.successfull = successfull;
        }

        public object ToObject() {
            return new {startDate, result, belongsToTestcase, successfull };
        }

        public object ToObjectWithID() {
            return new {id, startDate, result, belongsToTestcase, successfull };
        }
    }
}