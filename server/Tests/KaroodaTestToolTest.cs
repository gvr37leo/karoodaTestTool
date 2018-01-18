using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using karoodaTestToolServer.DAL;
using karoodaTestToolServer.Models;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System.Collections.Generic;

namespace Tests {

    [TestClass]
    public class KaroodaTestToolTest {

        [TestMethod]
        public void RetrieveAndExecuteTestcase9() {
            int id = 9;
            IWebDriver driver = new ChromeDriver();
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
            Result result = new Result(id, (int)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds, true);

            TestCaseDAL testcaseDAL = new TestCaseDAL();
            testcaseDAL.Execute(id, driver, result);
            driver.Quit();

            Assert.IsTrue(result.successfull);

        }

        [TestMethod]
        public void ExecuteMockedTestcaseGoogle() {

            List<Step> steps = new List<Step>{
                Step.initialize("gotourl",1,new List<ParameterDef> {
                    ParameterDef.initialize("url",ParamType.text,"https://www.google.nl/")
                }),
                Step.initialize("write",2,new List<ParameterDef> {
                    ParameterDef.initialize("selector",ParamType.text,"#lst-ib"),
                    ParameterDef.initialize("text",ParamType.text,"gorillait")
                }),
                Step.initialize("click",3,new List<ParameterDef> {
                    ParameterDef.initialize("selector",ParamType.text,"#tsf > div.tsf-p > div.jsb > center > input[type=\"submit\"]:nth-child(1)")
                }),
                Step.initialize("wait",4,new List<ParameterDef> {
                }),
            };

            Result result = ExecuteSteps(steps);
            Assert.IsTrue(result.successfull);
        }

        [TestMethod]
        public void ExecuteMockedTestcaseJavascript() {
            List<Step> steps = new List<Step>{
                Step.initialize("gotourl",1,new List<ParameterDef> {
                    ParameterDef.initialize("url",ParamType.text,"https://www.google.nl/")
                }),
                Step.initialize("ExecuteJavascript",2,new List<ParameterDef> {
                    ParameterDef.initialize("javascript",ParamType.text,"console.log('hello world')"),
                }),
                Step.initialize("wait",4,new List<ParameterDef> {
                }),
            };
            Result result = ExecuteSteps(steps);
            Assert.IsTrue(result.successfull);
        }



        private static Result ExecuteSteps(List<Step> steps) {
            IWebDriver driver = new ChromeDriver();
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
            Result result = new Result(0, (int)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds, true);

            TestCaseDAL testcaseDAL = new TestCaseDAL();
            testcaseDAL.ExecuteSteps(steps, driver, result);
            driver.Quit();
            return result;
        }
    }
}
