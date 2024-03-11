using AutoMapper;
using Volunteer_Project.Interface.RepositoryInterface;
using Volunteer_Project.Interface.ServiceInterface;
using Volunteer_Project.Models;
using Volunteer_Project.RequestModel;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Services
{
    public class VolunteerMappingService : IVolunteerMappingService
    {
        #region Fields
        private readonly IVolunteerMappingRepo _volunteerMappingRepo;
        private readonly IMapper _mapper;
        #endregion

        #region Parameterized Constructor
        /// <summary>
        /// 
        /// </summary>
        /// <param name="volunteerMappingRepo"></param>
        /// <param name="mapper"></param>
        public VolunteerMappingService(IVolunteerMappingRepo volunteerMappingRepo,IMapper mapper)
        {
            _volunteerMappingRepo = volunteerMappingRepo;
             _mapper = mapper;
        }
        #endregion


        #region Add VolunteerMapping Service
        /// <summary>
        /// Add Details in Volunteer Mapping table 
        /// </summary>
        /// <param name="requestVolunteerMapping"></param>
        /// <returns></returns>
        public async Task<List<RequestVolunteerMapping>> Add_VolunteerMapping(List<RequestVolunteerMapping> requestVolunteerMapping)
        {

            List<RequestVolunteerMapping> reqvolunteerMappings = new List<RequestVolunteerMapping>();

            List<VolunteerMapping> volunteerMapping = _mapper.Map<List<VolunteerMapping>>(requestVolunteerMapping);

            foreach (var volunteer in volunteerMapping)
            {
                var volunteerMap = await _volunteerMappingRepo.Add(volunteer);

                if (volunteerMap != null)
                {
                    var Next = _mapper.Map<RequestVolunteerMapping>(volunteerMap);
                    reqvolunteerMappings.Add(Next);
                }
            }
            return reqvolunteerMappings;
        }
        #endregion

        public async Task<List<ViewRequest>> Get_Nearby_Request(int volunteerId, int radius)
        {
            var result = await _volunteerMappingRepo.Get_Nearby_Request(volunteerId,radius);
            return result;
        }

    }
}
