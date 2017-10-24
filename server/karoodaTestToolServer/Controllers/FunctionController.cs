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
        Dictionary<string, FunctionDefinition> functionMap = new Dictionary<string, FunctionDefinition>();

        public FunctionController() {

            AddToDictionary("click", "click on element",new List<FuncParameter> {
                new FuncParameter("selector",ParamType.text)
            });

            AddToDictionary("write", "write in input element", new List<FuncParameter> {
                new FuncParameter("selector",ParamType.text),
                new FuncParameter("text",ParamType.text)
            });

            AddToDictionary("refresh", "refresh the page", new List<FuncParameter> {
            });

            AddToDictionary("gotourl", "go to url", new List<FuncParameter> {
                new FuncParameter("url",ParamType.text)
            });

            AddToDictionary("assert", "check if input contains value", new List<FuncParameter> {
            });

            AddToDictionary("screenshot", "take a screenshot", new List<FuncParameter> {
            });

            AddToDictionary("scroll", "scroll to element", new List<FuncParameter> {
                new FuncParameter("selector",ParamType.text)
            });

            //AddToDictionary("click", "user clicks on element", new List<FuncParameter> {
            //    new FuncParameter(ParamType.text)
            //});
        }

        private void AddToDictionary(string key, string description, List<FuncParameter> parameters) {
            functionMap.Add(key, new FunctionDefinition(key, description, parameters));
        }

        public IHttpActionResult Get() {
            List<FunctionDefinition> funcs = functionMap.Select((pair) => pair.Value).ToList();
            return Ok(funcs);
        }

        public IHttpActionResult Get(string funcname) {
            FunctionDefinition result = functionMap[funcname];

            if (result != null) {
                return Ok(result);
            } else {
                return NotFound();
            }
        }
    }
}
