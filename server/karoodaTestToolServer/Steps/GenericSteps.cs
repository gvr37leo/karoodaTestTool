using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace karoodaTestToolServer.Steps {
    public class GenericSteps {
        IWebDriver driver;

        GenericSteps(IWebDriver driver) {
            this.driver = driver;
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
            driver.Navigate().Refresh();
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