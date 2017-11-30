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
using System.Web.Http.Cors;
using karoodaTestToolServer.DAL;

namespace karoodaTestToolServer.Controllers{

    public class TestCaseController : AbstractController<TestCase> {

        [ApiExplorerSettings(IgnoreApi = true)]
        public override AbstractDAL<TestCase> DALRetriever() {
            return new TestCaseDAL();
        }

        [HttpPost]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Execute(int id) {

            IWebDriver driver = new ChromeDriver();
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
            Result result = new Result(id, (int)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds, true);

            TestCaseDAL testcaseDAL = new TestCaseDAL();
            testcaseDAL.Execute(id,driver,result);
            driver.Quit();

            ResultDAL resultDAL = new ResultDAL();
            resultDAL.Insert(result);
            return Ok();
        }
    }
}
