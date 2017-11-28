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
            genericSteps.GoToURL($"https://projectpaul2-stageheda-stages.karooda.io/#{entity}");
        }

        public void goToDetail(string entity,string id) {
            genericSteps.GoToURL($"https://projectpaul2-stageheda-stages.karooda.io/#{entity}/{id}");
        }

        public void clickSave() {
            genericSteps.Click("a.btn.btn-fit-height.green.submit-hulpaanvraag-form.disabled");
        }

        public void clickDelete() {
            genericSteps.Click("a.btn.btn-fit-height.red.submit-delete-hulpaanvraag.hide-on-small");
        }

    }
}