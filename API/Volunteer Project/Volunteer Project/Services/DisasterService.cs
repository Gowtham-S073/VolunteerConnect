using AutoMapper;
using Volunteer_Project.Exceptions;
using Volunteer_Project.Interface.RepositoryInterface;
using Volunteer_Project.Interface.ServiceInterface;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Services
{
    public class DisasterService : IDisasterService
    {
        #region Fields
        private readonly IDisasterRepo _disasterRepo;
        private readonly IMapper _mapper;
        #endregion

        #region Parameterized Constructor
        
        public DisasterService(IDisasterRepo disasterRepo, IMapper mapper)
        {
            _disasterRepo = disasterRepo;
            _mapper = mapper;
        }
        #endregion

        #region
        public async Task<List<ViewDisasters>> GetallDisasters()
        {
            var disasters = await _disasterRepo.GetDisasters();
            if (disasters == null)
            {
                throw new NullException("No Disasters");
            }
            List<ViewDisasters> result = _mapper.Map<List<ViewDisasters>>(disasters);
            return result;
        }
        #endregion
    }
}
