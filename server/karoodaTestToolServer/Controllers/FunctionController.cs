using karoodaTestToolServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace karoodaTestToolServer.Controllers
{
    public class FunctionController : ApiController
    {
        Dictionary<string, FunctionDefinition> functionMap = new Dictionary<string, FunctionDefinition>();

        public FunctionController() {

            AddToDictionary("click", "user clicks on element",new List<FuncParameter> {
                new FuncParameter("selector",ParamType.text)
            });

            AddToDictionary("write", "write in input element", new List<FuncParameter> {
                new FuncParameter("selector",ParamType.text),
                new FuncParameter("text",ParamType.text)
            });

            AddToDictionary("refresh", "user clicks on element", new List<FuncParameter> {
            });

            AddToDictionary("gotourl", "user clicks on element", new List<FuncParameter> {
                new FuncParameter("url",ParamType.text)
            });

            AddToDictionary("assert", "user clicks on element", new List<FuncParameter> {
            });

            AddToDictionary("screenshot", "user clicks on element", new List<FuncParameter> {
            });

            AddToDictionary("scroll", "user clicks on element", new List<FuncParameter> {
                new FuncParameter("selector",ParamType.text)
            });

            //AddToDictionary("click", "user clicks on element", new List<FuncParameter> {
            //    new FuncParameter(ParamType.text)
            //});
        }

        private void AddToDictionary(string key, string description, List<FuncParameter> parameters) {
            functionMap.Add(key, new FunctionDefinition(key, description, parameters));
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
