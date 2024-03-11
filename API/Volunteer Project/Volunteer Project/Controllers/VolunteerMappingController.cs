using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Volunteer_Project.DTO;
using Volunteer_Project.Exceptions;
using Volunteer_Project.Interface.ServiceInterface;
using Volunteer_Project.Models;
using Volunteer_Project.RequestModel;
using Volunteer_Project.Services;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VolunteerMappingController : ControllerBase
    {
        #region Field
        private readonly IVolunteerMappingService _volunteerMapping;
        #endregion

        #region Parameterized constructor
        public VolunteerMappingController(IVolunteerMappingService volunteerMapping)
        {
            _volunteerMapping = volunteerMapping;
        }
        #endregion

        #region Actions to Add data in Volunteer Mapping table
        /// <summary>
        /// 
        /// </summary>
        /// <param name="RequestVolunteerMapping"></param>
        /// <returns>register</returns>
        [HttpPost]
        public async Task<ActionResult<List<RequestVolunteerMapping>>> Add_VolunteerMapping(List<RequestVolunteerMapping> requestVolunterMapping)
        {
                var volunteer = await _volunteerMapping.Add_VolunteerMapping(requestVolunterMapping);
                return Created("Data Added in Volunteer Mapping", volunteer);
            
        }
        #endregion

        [HttpGet]

        public async Task<List<ViewRequest>> Get_Nearby_Request(int volunteerId, int radius)
        {
            var filtered_Request = await _volunteerMapping.Get_Nearby_Request(volunteerId, radius);
            return filtered_Request;

        }
    }

   
}
