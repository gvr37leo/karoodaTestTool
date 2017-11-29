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
        public string result;

        public Result(int belongsToTestcase, int startDate,string result) {
            this.startDate = startDate;
            this.result = result;
            this.belongsToTestcase = belongsToTestcase;
        }

        public object ToObject() {
            return new {startDate, result, belongsToTestcase };
        }

        public object ToObjectWithID() {
            return new {id, startDate, result, belongsToTestcase };
        }
    }
}