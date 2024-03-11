using AutoMapper;
using Volunteer_Project.Exceptions;
using Volunteer_Project.Interface.RepositoryInterface;
using Volunteer_Project.Interface.ServiceInterface;
using Volunteer_Project.Models;
using Volunteer_Project.RequestModel;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Services
{
    public class DisasterNeedService : IDisasterNeedsService
    {

        #region Fields
        private readonly IDisasterNeedsRepo _disasterNeedRepo;
        private readonly IMapper _mapper;
        #endregion

        #region Parameterized Constructor
        /// <summary>
        /// 
        /// </summary>
        /// <param name="disasterRepo"></param>
        /// <param name="mapper"></param>
        public DisasterNeedService(IDisasterNeedsRepo disasterRepo, IMapper mapper)
        {
            _disasterNeedRepo = disasterRepo;
            _mapper = mapper;
        }
        #endregion

        #region Add Disaster Need Items
        /// <summary>
        /// </summary>
        public async Task<RequestDisasterNeeds> Add_DisasterNeeds(RequestDisasterNeeds requestDisasterNeeds)
        {
            if (requestDisasterNeeds == null)
            {
                throw new NullException("must not be empty");
            }
            var disasterNeeds= await _disasterNeedRepo.getAllDisasterneeds();
            if (disasterNeeds == null)
            {
                throw new NullException("Disaster Entity is Empty");
            }
            var duplicateNeeds = disasterNeeds.FirstOrDefault(n => n.Items == requestDisasterNeeds.Items);
            if (duplicateNeeds != null)
            {
                throw new DuplicateRecordException("this record already exist");
            }
            var DisasterItem = _mapper.Map<DisasterNeed>(requestDisasterNeeds);
            await _disasterNeedRepo.Add_DisasterNeeds(DisasterItem);
            return requestDisasterNeeds;
        }
        #endregion

        public async Task<List<ViewDisasterneeds>> viewAllDisasterNeed()
        {
            var needs = await _disasterNeedRepo.getAllDisasterneeds();
            if(needs == null)
            {
                throw new NullException("Disaster Entity is Empty");
            }
            var result = _mapper.Map<List<ViewDisasterneeds>>(needs);
            return result;
        }
    }
}
