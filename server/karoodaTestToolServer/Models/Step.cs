﻿using karoodaTestToolServer.Controllers;
using System.Collections.Generic;
using System;

namespace karoodaTestToolServer.Models {
    public class Step : IToDynamicObject {

        public int id;
        public string functionPointer;
        public int belongsToTestcase;
        public int stepOrder;
        public List<ParameterDef> parameters;

        public object ToObject() {
            return new { functionPointer,belongsToTestcase,stepOrder};
        }
    }



}