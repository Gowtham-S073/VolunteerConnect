using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Volunteer_Project.Exceptions;
using Volunteer_Project.Interface.ServiceInterface;
using Volunteer_Project.RequestModel;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        #region Field
        private readonly IRequestService _requestService;
        #endregion

        #region Parameterized constructor
        public RequestController(IRequestService requestService)
        {
            _requestService = requestService;
        }
        #endregion

        #region Actions to Add request in Request table
        /// <summary>
        /// 
        /// </summary>
        /// <param name="AddUserRequest"></param>
        /// <returns>register</returns>
        [HttpPost]

        public async Task<ActionResult<RequestUserRequest>> AddRequest(RequestUserRequest AddUserRequest)
        {
                var newRequest = await _requestService.AddRequest(AddUserRequest);
                return Created("User Request Added", newRequest);
        }
        #endregion

        #region Requests by ID
        [HttpGet("Requests by Requestid")]
        public async Task<ActionResult<List<RequestsByRequestId>>> GetRequests(int Id)
        {
            var request = await _requestService.RequestsbyId(Id);
            return request;
        }
        #endregion

        #region
        [HttpGet("Pending Request")]
        public async Task<ActionResult<List<ViewPendingRequestByRequestId>>> PendingRequests(int requestId)
        {
            var pendingRequest = await _requestService.GetPendingRequests(requestId);
            return pendingRequest;
        }
        #endregion

        #region
        [HttpGet("DisplayRequestsForVolunteers")]
        public async Task<ActionResult<List<ViewRequestsForVolunteers>>> RequestsForVolunteers()
        {
            var requests = await _requestService.GetRequestsForVolunteer();
            return requests;
        }
        #endregion
    }
}
