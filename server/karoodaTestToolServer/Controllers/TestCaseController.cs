using GorillaIT.DbUtils;
using GorillaIT.DbUtils.MsSqlUtils;
using karoodaTestToolServer.Models;
using System.Configuration;
using System.Web.Http;


namespace karoodaTestToolServer.Controllers
{
    public class TestCaseController : ApiController{
        private SqlUtils _sqlUtils;

        public TestCaseController() {
            _sqlUtils = new MsSqlUtils(ConfigurationManager.ConnectionStrings["SQLCon"].ConnectionString);
        }

        [HttpPost]
        public IHttpActionResult Execute() {
            return Ok();
        }

        [HttpGet]
        public IHttpActionResult Get() {
            var allTestCases = _sqlUtils.Query<TestCase>("SELECT * FROM Testcases");
            return Ok(allTestCases);
        }

        [HttpGet]
        public IHttpActionResult Get(int id) {
            var testCase = _sqlUtils.SingleOrDefault<TestCase>("SELECT * FROM Testcases WHERE Id=@Id", new { Id = id });
            return Ok(testCase);
        }

        [HttpPost]
        public IHttpActionResult Post(TestCase testCase) {
            return Ok();
        }

        [HttpPut]
        public IHttpActionResult Put(TestCase testCase) {
            var affectedRows = _sqlUtils.Execute("UPDATE Testcases SET functionPointer=@functionPointer, belongsToTestcase=@belongsToTestcase WHERE id=@id", testCase);
            if (affectedRows == 1) {
                return Ok();
            } else {
                return NotFound();
            }
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id) {
            var affectedRows = _sqlUtils.Execute("delete from Testcases WHERE id=@id", id);
            if (affectedRows == 1) {
                return Ok();
            } else {
                return NotFound();
            }
        }
    }
}
