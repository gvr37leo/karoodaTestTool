using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace karoodaTestToolServer.Models {
    public class TestCase {
        public int id;
        public string name;
        public List<Step> steps;
    }
}