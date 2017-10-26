using karoodaTestToolServer.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace karoodaTestToolServer.Models {
    public class ParameterDef : IToDynamicObject {
        public int id;
        public string name;
        public ParamType type;
        public string value;
        public int belongsToStep;
        //public string pointerType;

        //string name,
        public ParameterDef(int id, string type,  string value, int belongsToStep) {
            this.id = id;
            //this.type = type;
            //this.name = name;
            this.value = value;
            this.belongsToStep = belongsToStep;
        }

        public ParameterDef(string paramName, ParamType type) {
            this.name = paramName;
            this.type = type;
        }

        public ParameterDef() {

        }

        public object ToObject() {
            return new {name,type,value,belongsToStep };
        }
    }

    public enum ParamType { text, number, pointer }
}