using karoodaTestToolServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace karoodaTestToolServer.Controllers{

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class FunctionController : ApiController{
        Dictionary<string, FunctionDef> functionMap = new Dictionary<string, FunctionDef>();

        public FunctionController() {

            AddToDictionary("click", "click on element",new List<ParameterDef> {
                new ParameterDef("selector",ParamType.text)
            });

            AddToDictionary("write", "write in input element", new List<ParameterDef> {
                new ParameterDef("selector",ParamType.text),
                new ParameterDef("text",ParamType.text)
            });

            AddToDictionary("refresh", "refresh the page", new List<ParameterDef> {
            });

            AddToDictionary("gotourl", "go to url", new List<ParameterDef> {
                new ParameterDef("url",ParamType.text)
            });

            AddToDictionary("assert", "check if input contains value", new List<ParameterDef> {
            });

            AddToDictionary("screenshot", "take a screenshot", new List<ParameterDef> {
            });

            AddToDictionary("scroll", "scroll to element", new List<ParameterDef> {
                new ParameterDef("selector",ParamType.text)
            });
        }

        private void AddToDictionary(string key, string description, List<ParameterDef> parameters) {
            functionMap.Add(key, new FunctionDef(key, description, parameters));
        }

        public IHttpActionResult Get() {
            List<FunctionDef> funcs = functionMap.Select((pair) => pair.Value).ToList();
            return Ok(funcs);
        }

        public FunctionDef GetFunc(string funcname) {
            return functionMap[funcname];
        }

        public IHttpActionResult Get(string funcname) {
            FunctionDef result = functionMap[funcname];

            if (result != null) {
                return Ok(result);
            } else {
                return NotFound();
            }
        }
    }
}
