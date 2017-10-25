using System.Collections.Generic;

namespace karoodaTestToolServer.Models {
    public class Step {

        public int id { get; set; }
        public string functionPointer { get; set; }
        public int belongsToTestcase { get; set; }
        public List<ParameterDef> parameters;

    }



}