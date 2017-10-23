using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace karoodaTestToolServer.Models {
    public class FunctionDefinition {
        string _id;
        string name;
        string description;
        List<Parameter> parameters = new List<Parameter>();
    }

    public class Parameter {
        ParamType type;
        string pointerType;

        Parameter() {

        }
    }

    public enum ParamType { text, number, pointer}
}