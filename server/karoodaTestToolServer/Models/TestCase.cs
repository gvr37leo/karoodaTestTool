using karoodaTestToolServer.Controllers;
using karoodaTestToolServer.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace karoodaTestToolServer.Models {
    public class TestCase : IToDynamicObject {
        public int id;
        public string name;
        public List<Step> steps;

        public object ToObject() {
            return new {name};
        }
    }
}