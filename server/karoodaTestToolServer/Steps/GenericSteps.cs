using karoodaTestToolServer.Controllers;
using karoodaTestToolServer.Models;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Interactions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace karoodaTestToolServer.Steps {
    public class GenericSteps {
        IWebDriver driver;

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
                        Assert();
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
            }



        }

        public void Click (string selector){
            IWebElement element = driver.FindElement(By.CssSelector(selector));
            element.Click();
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

        public void Assert() {

        }

        public void Screenshot() {
            OpenQA.Selenium.Screenshot ss = ((ITakesScreenshot)driver).GetScreenshot();
            ss.SaveAsFile($"screenshot:{DateTime.Now.ToShortDateString()}.png", ScreenshotImageFormat.Png);
        }

        public void Scroll(string selector) {
            IWebElement element = driver.FindElement(By.CssSelector(selector));
            Actions actions = new Actions(driver);
            actions.MoveToElement(element);
            actions.Perform();
        }
    }
}