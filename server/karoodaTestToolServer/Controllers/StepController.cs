using GorillaIT.DbUtils;
using GorillaIT.DbUtils.MsSqlUtils;
using karoodaTestToolServer.Models;
using System.Configuration;
using System.Web.Http;

namespace karoodaTestToolServer.Controllers {
    public class StepController : ApiController{
        private SqlUtils _sqlUtils;

        public StepController() {
            _sqlUtils = new MsSqlUtils(ConfigurationManager.ConnectionStrings["SQLCon"].ConnectionString);
        }
        
        [HttpGet]
        public IHttpActionResult Get() {
            var allSteps = _sqlUtils.Query<Step>("SELECT * FROM Steps");
            return Ok(allSteps);
        }

        [HttpGet]
        public IHttpActionResult Get(int id) {
            var step = _sqlUtils.SingleOrDefault<Step>("SELECT * FROM Steps WHERE Id=@Id", new { Id = id });
            return Ok(step);
        }

        [HttpPost]
        public IHttpActionResult Post(Step step) {
            return Ok();
        }

        [HttpPut]
        public IHttpActionResult Put(Step step) {
            var affectedRows = _sqlUtils.Execute("UPDATE Steps SET functionPointer=@functionPointer, belongsToTestcase=@belongsToTestcase WHERE id=@id", step);
            if (affectedRows == 1){
                return Ok();
            } else {
                return NotFound();
            }
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id) {
            var affectedRows = _sqlUtils.Execute("delete from steps WHERE id=@id", id);
            if (affectedRows == 1) {
                return Ok();
            } else {
                return NotFound();
            }
        }


    }
}
