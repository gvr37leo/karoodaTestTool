using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace karoodaTestToolServer.Models {

    public class FunctionDef {
        public int id;
        public string name;
        public string description;
        public List<ParameterDef> parameters;

        public FunctionDef(string name, string description, List<ParameterDef> parameters) {
            this.name = name;
            this.description = description;
            this.parameters = parameters;
        }
    }
}