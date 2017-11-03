using GorillaIT.DbUtils;
using GorillaIT.DbUtils.MsSqlUtils;
using karoodaTestToolServer.Controllers;
using karoodaTestToolServer.Models;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Http;
using System;
using karoodaTestToolServer.DAL;
using System.Web.Http.Cors;

namespace karoodaTestToolServer.Controllers {
    public class StepController : AbstractController<Step> {
        public override AbstractDAL<Step> DALRetriever() {
            return new StepDAL();
        }

        [HttpPost]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult PostStep(Step step) {
             
            step.stepOrder = DAL.Get(new Filter(new List<FilterEntry>() {new FilterEntry("belongsToTestcase", $"{step.belongsToTestcase}") })).Count;


            int newStepId = DAL.Insert(step);
            Filter filter = new Filter(new List<FilterEntry>() { new FilterEntry("id", $"{newStepId}") });
            Step theNewStep = DAL.Get(filter)[0];

            FunctionDef function = new FunctionController().GetFunc(theNewStep.functionPointer);


            ParameterDAL paramDAL = new ParameterDAL();
            foreach (ParameterDef parameter in function.parameters) {
                parameter.belongsToStep = newStepId;
                paramDAL.Insert(parameter);
            }


            //get step from returned id
            //get parameters from step.functionpointer
            //create paramaters and insert
            return Ok(new { id = newStepId });
        }
    }
}
