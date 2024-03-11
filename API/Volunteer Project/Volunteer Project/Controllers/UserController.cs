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
    public class UserController : ControllerBase
    {
        #region Field
        private readonly IUserService _userService;
        #endregion

        #region Parameterized constructor
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        #endregion

        #region Actions to Add data in User table
        /// <summary>
        /// 
        /// </summary>
        /// <param name="RequestAddUser"></param>
        /// <returns>register</returns>
        [HttpPost]
        public async Task<ActionResult<RequestNewUser>> Add_UserDetails(RequestNewUser userDetail)
        {   
            var user = await _userService.AddUser(userDetail);
                return Created("Data Added in User Table", user);
        }
        #endregion


        [HttpGet("User's Request Details by phone number")]
        public async Task<ActionResult<List<ViewRequestDetailsByPhoneNumber>>> GetUserRequestDetail(long phoneNumber)
        {
            return await _userService.GetUserDetailsbyPhoneNumber(phoneNumber);
        }
    }
}
