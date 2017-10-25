using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace karoodaTestToolServer.Models {

    public class FunctionDefinition {
        public int id;
        public string name;
        public string description;
        public List<FuncParameter> parameters;

        public FunctionDefinition(string name, string description, List<FuncParameter> parameters) {
            this.name = name;
            this.description = description;
            this.parameters = parameters;
        }
    }

    public class FuncParameter {
        public int id;
        public ParamType type;
        public string name;
        public string value;
        public int belongsToFunction;

        public string pointerType;



        public FuncParameter(string name, ParamType type) {
            this.name = name;
            this.type = type;
        }
    }

    public enum ParamType { text, number, pointer}
}