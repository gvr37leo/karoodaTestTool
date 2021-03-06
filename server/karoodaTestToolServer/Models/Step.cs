﻿using karoodaTestToolServer.Controllers;
using System.Collections.Generic;
using System;
using karoodaTestToolServer.DAL;

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

        public object ToObjectWithID() {
            return new { functionPointer, belongsToTestcase, stepOrder,id };
        }

        public static Step initialize(string functionPointer, int stepOrder, List<ParameterDef> parameters) {
            Step step = new Step();
            step.functionPointer = functionPointer;
            step.stepOrder = stepOrder;
            step.parameters = parameters;
            return step;
        }
    }



}