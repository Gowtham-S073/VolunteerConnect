using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Volunteer_Project.Interface.ServiceInterface;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DisasterController : ControllerBase
    {
        #region Field
        private readonly IDisasterService _disasterService;
        #endregion

        #region Parameterized constructor
        public DisasterController(IDisasterService disasterService)
        {
            _disasterService = disasterService;
        }
        #endregion


        #region to get all the Disasters
        [HttpGet("disasters")]
        public async Task<ActionResult<List<ViewDisasters>>> GetDisasters()
        {
            return await _disasterService.GetallDisasters();
        }
        #endregion
    }
}
