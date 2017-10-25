using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace karoodaTestToolServer.Models {
    public class ParameterDef {
        public int id;
        public ParamType type;
        public string name;
        public string value;
        public int belongsToFunction;

        public string pointerType;



        public ParameterDef(string name, ParamType type) {
            this.name = name;
            this.type = type;
        }
    }

    public enum ParamType { text, number, pointer }
}