using karoodaTestToolServer.Controllers;
using karoodaTestToolServer.Models;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Interactions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace karoodaTestToolServer.Steps {
    public class GenericSteps {
        IWebDriver driver;
        bool assertionFailed = false;

        public GenericSteps(IWebDriver driver) {
            this.driver = driver;
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
                assertionFailed = true;
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
            Actions actions = new Actions(driver);
            actions.MoveToElement(element);
            actions.Perform();
        }
    }
}