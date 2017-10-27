using Dapper;
using GorillaIT.DbUtils.MsSqlUtils;
using karoodaTestToolServer.DAL;
using karoodaTestToolServer.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace karoodaTestToolServer.Controllers{

    public abstract class AbstractController<T> : ApiController where T:IToDynamicObject{
        [ApiExplorerSettings(IgnoreApi = true)]
        public abstract AbstractDAL<T> DALRetriever();
        protected AbstractDAL<T> DAL;

        public AbstractController() {
            DAL = DALRetriever();
        }

        [HttpPost]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult GetFiltered(Filter filter) {
            return Ok(DAL.Get(filter));
        }

        [HttpPost]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Post(T entity) {
            return check(DAL.Insert(entity));
        }

        [HttpPut]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Put(T entity) {
            return check(DAL.Update(entity));
        }

        [HttpDelete]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Delete(int id) {
            return check(DAL.Delete(id));
        }

        private IHttpActionResult check(int affectedRows) {
            if (affectedRows == 1) {
                return Ok();
            } else {
                return NotFound();
            }
        }
    }
}
