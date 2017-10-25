using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace karoodaTestToolServer.Models {
    public class ParameterDef {
        public int id;
        public string name;
        public ParamType type;
        public string value;
        public int belongsToStep;
        //public string pointerType;



        public ParameterDef(string paramName, ParamType type) {
            this.name = paramName;
            this.type = type;
        }
    }

    public enum ParamType { text, number, pointer }
}