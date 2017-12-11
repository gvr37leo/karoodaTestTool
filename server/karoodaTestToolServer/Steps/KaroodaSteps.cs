using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace karoodaTestToolServer.Steps {
    public class KaroodaSteps {
        private GenericSteps genericSteps;

        public KaroodaSteps(GenericSteps steps) {
            genericSteps = steps;
        }

        public void goToTab(string entity) {
            genericSteps.GoToURL($"http://projectname-clientname-partnername.karooda.localtest.me/#{entity}");
        }

        public void goToDetail(string entity,string id) {
            genericSteps.GoToURL($"http://projectname-clientname-partnername.karooda.localtest.me/#{entity}/{id}");
        }

        public void clickSave() {
            genericSteps.Wait(1);
            genericSteps.Click("#content > div > form > div.Persoonheader > div > div > div.page-toolbar > div > a.btn.btn-fit-height.green.submit-Persoon-form");
        }

        public void clickDelete() {
            genericSteps.Click("#content > div > form > div.Persoonheader > div > div > div.page-toolbar > div > a.btn.btn-fit-height.red.submit-delete-Persoon.hide-on-small");
        }

        public void assertField(string field, string expected){
            genericSteps.Assert($"#{field} > div > div > input", expected);
        }

        public void writeField(string field, string value) {
            IWebElement element = genericSteps.driver.FindElement(By.CssSelector($"#{field} > div > div > input"));
            element.Clear();
            element.SendKeys(value);
        }

    }
}