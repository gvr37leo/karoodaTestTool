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

namespace karoodaTestToolServer.Controllers
{

    public class TestCaseDAL : AbstractDAL<TestCase> {

        public override string getTableName() {
            return "TestCase";
        }

        public override List<string> getColumns() {
            return new List<string> { "name" };
        }
    }

    public class TestCaseController : AbstractController<TestCase> {
        public override AbstractDAL<TestCase> DALGetter() {
            return new TestCaseDAL();
        }

        [HttpPost]
        public IHttpActionResult Execute(int id) {
            IWebDriver driver = new ChromeDriver();
            GenericSteps gensteps = new GenericSteps(driver);

            //testCase.steps = new StepController()._GetStepsFromTestcase(id);

            //foreach (Step step in testCase.steps) {
            //    gensteps.Call(step);
            //}

            driver.Quit();
            return Ok();
        }
    }
}
