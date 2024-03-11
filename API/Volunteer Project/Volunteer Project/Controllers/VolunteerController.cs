using Microsoft.AspNetCore.Mvc;
using Volunteer_Project.Exceptions;
using Volunteer_Project.DTO;
using Volunteer_Project.Models;
using Volunteer_Project.RequestModel;
using Volunteer_Project.Interface.ServiceInterface;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class VolunteerController : ControllerBase
    {
        #region Field
        private readonly IVolunteerService _volunteerService;
        #endregion

        #region Parameterized constructor
        public VolunteerController(IVolunteerService volunteerService)
        {
            _volunteerService = volunteerService;
        }
        #endregion

        #region Actions to Add 
        /// <summary>
        /// 
        /// </summary>
        /// <param name="volunteerRegisterDTO"></param>
        /// <returns>register</returns>
        [ProducesResponseType(typeof(VolunteerDTO), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [HttpPost]
        public async Task<ActionResult<ViewVolunteerRegisterDetails>> Register(RequestVolunterRegister requestVolunterRegister)
        {
                ViewVolunteerRegisterDetails volunteer = await _volunteerService.Register(requestVolunterRegister);
                return Created("volunteer Registered", volunteer);
           
        }
        #endregion

        #region Actions to login
        /// <summary>
        /// 
        /// </summary>
        /// <param name="volunteerDTO"></param>
        /// <returns>login</returns>
        [ProducesResponseType(typeof(VolunteerDetail), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [HttpPost]
        public async Task<ActionResult<ViewToken>> LogIN(VolunteerDTO volunteerDTO)
        {
                ViewToken volunteer = await _volunteerService.LogIN(volunteerDTO);
                return Ok(volunteer);      
        }
        #endregion

    }
}
