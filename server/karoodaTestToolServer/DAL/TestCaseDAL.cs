using karoodaTestToolServer.Models;
using karoodaTestToolServer.Steps;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace karoodaTestToolServer.DAL {
    public class TestCaseDAL : AbstractDAL<TestCase> {

        public override string getTableName() {
            return "TestCase";
        }

        public override List<Column> getColumns() {
            return new List<Column> {
                new Column("name", DataType.text)
            };
        }

        public void Execute(int id) {
            IWebDriver driver = new ChromeDriver();
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
            GenericSteps gensteps = new GenericSteps(driver);

            Filter filter = new Filter(new List<FilterEntry>() { new FilterEntry("belongsToTestcase", $"{id}") });
            StepDAL stepDAL = new StepDAL();

            List<Step> steps = stepDAL.Get(filter);
            steps.OrderBy(s => s.stepOrder);
            foreach (Step step in steps) {


                Filter parameterFilter = new Filter(new List<FilterEntry>() { new FilterEntry("belongsToStep", $"{step.id}") });
                ParameterDAL parameterDAL = new ParameterDAL();
                List<ParameterDef> parameters = parameterDAL.Get(parameterFilter);
                step.parameters = parameters;


                gensteps.Call(step);
            }
            driver.Quit();
        }
    }
}