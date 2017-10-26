using GorillaIT.DbUtils;
using GorillaIT.DbUtils.MsSqlUtils;
using karoodaTestToolServer.Models;
using karoodaTestToolServer.Steps;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Http;
using System;
using System.Web.Http.Description;

namespace karoodaTestToolServer.Controllers
{

    public class TestCaseDAL : AbstractDAL<TestCase> {

        public override string getTableName() {
            return "TestCase";
        }

        public override List<Column> getColumns() {
            return new List<Column> {
                new Column("name", DataType.text)
            };
        }
    }

    public class TestCaseController : AbstractController<TestCase> {
        [ApiExplorerSettings(IgnoreApi = true)]
        public override AbstractDAL<TestCase> DALRetriever() {
            return new TestCaseDAL();
        }

        [HttpPost]
        public IHttpActionResult Execute(int id) {
            IWebDriver driver = new ChromeDriver();
            GenericSteps gensteps = new GenericSteps(driver);

            Filter filter = new Filter();
            filter.filterEntrys = new List<FilterEntry>() { new FilterEntry("belongsToTestcase",$"{id}")};
            StepDAL stepDAL = new StepDAL();

            List<Step> steps = stepDAL.Get(filter);
            foreach(Step step in steps) {

                
                Filter parameterFilter = new Filter();
                parameterFilter.filterEntrys = new List<FilterEntry>() { new FilterEntry("belongsToStep", $"{step.id}") };
                ParameterDAL parameterDAL = new ParameterDAL();
                List<ParameterDef> parameters = parameterDAL.Get(parameterFilter);
                step.parameters = parameters;


                gensteps.Call(step);
            }


            driver.Quit();
            return Ok();
        }
    }
}
