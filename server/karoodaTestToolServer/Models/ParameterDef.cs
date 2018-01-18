using karoodaTestToolServer.Controllers;
using karoodaTestToolServer.DAL;
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

        public object ToObjectWithID() {
            return new { name, type, value, belongsToStep,id };
        }

        public static ParameterDef initialize(string name, ParamType type, string value) {
            ParameterDef param = new ParameterDef();
            param.name = name;
            param.type = type;
            param.value = value;
            return param;
        }
    }

    public enum ParamType { text, number, pointer, entity, column }
}