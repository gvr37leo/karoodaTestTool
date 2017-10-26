using karoodaTestToolServer.Controllers;
using System.Collections.Generic;
using System;

namespace karoodaTestToolServer.Models {
    public class Step : IToDynamicObject {

        public int id { get; set; }
        public string functionPointer { get; set; }
        public int belongsToTestcase { get; set; }
        public List<ParameterDef> parameters;

        public object ToObject() {
            return new { functionPointer,belongsToTestcase};
        }
    }



}