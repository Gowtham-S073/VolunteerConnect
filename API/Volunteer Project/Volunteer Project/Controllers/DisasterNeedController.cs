using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Volunteer_Project.Exceptions;
using Volunteer_Project.Interface.ServiceInterface;
using Volunteer_Project.RequestModel;
using Volunteer_Project.Services;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DisasterNeedController : ControllerBase
    {
        #region Field
        private readonly IDisasterNeedsService _disasterNeedService;
        #endregion

        #region Parameterized constructor
        public DisasterNeedController(IDisasterNeedsService disasterNeedService)
        {
            _disasterNeedService = disasterNeedService;
        }
        #endregion

        #region Action to add Disaster Needs
        /// <summary>
        /// 
        /// </summary>
        /// <param name="DisasterNeeds"></param>
        /// <returns>add Disaster Need items</returns>
        [HttpPost]
        public async Task<ActionResult<RequestService>> Add_DisasterNeeds(RequestDisasterNeeds disasterNeeds)
        {
          
                var userNeed = await _disasterNeedService.Add_DisasterNeeds(disasterNeeds);
                return Created("User Needs added Successfully", disasterNeeds);
        }
        #endregion

        [HttpGet]

        public async Task<List<ViewDisasterneeds>> viewAllDisasterNeed()
        {
            var result = await _disasterNeedService.viewAllDisasterNeed();
            return result;
        }
    }
}
