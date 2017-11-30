using karoodaTestToolServer.Controllers;
using karoodaTestToolServer.DAL;
using karoodaTestToolServer.Models;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Interactions;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace karoodaTestToolServer.Steps {
    public class GenericSteps {
        IWebDriver driver;
        public KaroodaSteps karoodaSteps;
        private Result result;

        public GenericSteps(IWebDriver driver,Result result) {
            this.driver = driver;
            this.result = result;
            karoodaSteps = new KaroodaSteps(this);
        }

        public void Call(Step step) {
            Dictionary<string, ParameterDef> paramDict = step.parameters.ToDictionary(param => param.name);



            switch (step.functionPointer) {
                case "click": {
                        Click(paramDict["selector"].value);
                        break;
                    }
                case "write": {
                        Write(paramDict["selector"].value, paramDict["text"].value);
                        break;
                    }
                case "refresh": {
                        Refresh();
                        break;
                    }
                case "gotourl": {
                        GoToURL(paramDict["url"].value);
                        break;
                    }
                case "assert": {
                        Assert(paramDict["selector"].value, paramDict["value"].value);
                        break;
                    }
                case "screenshot": {
                        Screenshot();
                        break;
                    }
                case "scroll": {
                        Scroll(paramDict["selector"].value);
                        break;
                    }
                case "wait": {
                        Wait(1);
                        break;
                    }
                case "ExecuteJavascript": {
                        ExecuteJavascript(paramDict["javascript"].value);
                        break;
                    }
                case "ExecuteTestcase": {
                        int id;
                        if(int.TryParse(paramDict["testcaseid"].value,out id)){
                            ExecuteTestcase(id);
                        }
                        break;
                    }

                    //karoodasteps -------------------------------
                case "goToTab": {
                        karoodaSteps.goToTab(paramDict["entity"].value);
                        break;
                    }

                case "goToDetail": {
                        karoodaSteps.goToDetail(paramDict["entity"].value, paramDict["id"].value);
                        break;
                    }
                case "clickSave": {
                        karoodaSteps.clickSave();
                        break;
                    }
                case "clickDelete": {
                        karoodaSteps.clickDelete();
                        break;
                    }




                //            public void goToTab(string entity) {
                //    genericSteps.GoToURL($"https://projectpaul2-stageheda-stages.karooda.io/#{entity}");
                //}

                //public void goToDetail(string entity, string id) {
                //    genericSteps.GoToURL($"https://projectpaul2-stageheda-stages.karooda.io/#{entity}/{id}");
                //}

                //public void clickSave() {
                //    genericSteps.Click("a.btn.btn-fit-height.green.submit-hulpaanvraag-form.disabled");
                //}

                //public void clickDelete() {
                default: {
                        //maybe throw error
                        break;
                    }
            }



        }

        public void Click (string selector){
            IWebElement element = driver.FindElement(By.CssSelector(selector));
            IJavaScriptExecutor executor = (IJavaScriptExecutor)driver;
            executor.ExecuteScript("arguments[0].click()", element);//normal click can fail if the element is covered by another element or out of view. javascript doesn't have these issues
        }

        public void Write(string selector, string text) {
            //WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
            //IWebElement element = wait.Until(driver => driver.FindElement(By.CssSelector(selector)));
            IWebElement element = driver.FindElement(By.CssSelector(selector));
            element.SendKeys(text);
        }

        public void Refresh() {
            driver.Navigate().Refresh();
        }

        public void GoToURL(string url) {
            driver.Navigate().GoToUrl(url);
        }

        public void Assert(string selector, string value) {
            IWebElement element = driver.FindElement(By.CssSelector(selector));
            if(value != element.GetAttribute("value")) {
                result.successfull = false;
                result.result += $"element with selector {selector}: expected ${value} but actueal value was: ${element.GetAttribute("value")}\n";
            }
        }

        public void Screenshot() {
            OpenQA.Selenium.Screenshot ss = ((ITakesScreenshot)driver).GetScreenshot();
            //ss.SaveAsFile("C:/projects/karoodaTestTool/server/karoodaTestToolServer/screenshot.png", ScreenshotImageFormat.Png);
            string path = $"{Directory.GetCurrentDirectory()}/seleniumscreenshots/screenshot{DateTime.Now.ToString("yyyyMMddHHmmss")}.png";
            ss.SaveAsFile(path, ScreenshotImageFormat.Png);
        }

        public void Scroll(string selector) {
            IWebElement element = driver.FindElement(By.CssSelector(selector));
            IJavaScriptExecutor executor = (IJavaScriptExecutor)driver;
            executor.ExecuteScript("arguments[0].scrollIntoView()", element);
        }

        public void Wait(int delay) {
            var now = DateTime.Now;
            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(delay));
            wait.PollingInterval = TimeSpan.FromSeconds(0.3);
            wait.Until(wd => (DateTime.Now - now) - TimeSpan.FromSeconds(delay) > TimeSpan.Zero);
        }

        public void ExecuteJavascript(string javascript) {
            IJavaScriptExecutor executor = (IJavaScriptExecutor)driver;
            executor.ExecuteScript(javascript);
        }

        public void ExecuteTestcase(int testcaseid) {
            new TestCaseDAL().Execute(testcaseid,driver,result);
        }
    }
}