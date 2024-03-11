using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Volunteer_Project.Exceptions;
using Volunteer_Project.Interface.ServiceInterface;
using Volunteer_Project.Models;
using Volunteer_Project.RequestModel;

namespace Volunteer_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestDetailsController : ControllerBase
    {
        #region Field
        private readonly IRequestDetailService _requestDetailService;
        #endregion

        #region Parameterized constructor
        public RequestDetailsController(IRequestDetailService requestDetailService)
        {
            _requestDetailService = requestDetailService;
        }
        #endregion

        #region Actions to Add data in Volunteer Mapping table
        /// <summary>
        /// 
        /// </summary>
        /// <param name="RequestVolunteerMapping"></param>
        /// <returns>register</returns>
        [HttpPost]
        public async Task<ActionResult<List<RequestRequestDetail>>> Add_RequestDetails(List<RequestRequestDetail> requestDetail)    
        {
            try
            {
                var volunteer = await _requestDetailService.Add_RequestDetail(requestDetail);
                return Created("Data Added in Request Detail", volunteer);
            }
            catch (NullException ne)
            {
                return BadRequest(new Error(404, ne.Message));
            }
            catch (DuplicateRecordException de)
            {
                return BadRequest(new Error(400, de.Message));
            }
            catch (InvalidSqlException ise) 
            {
                return BadRequest(new Error(500, ise.Message));
            }

        }
        #endregion
    }
}

