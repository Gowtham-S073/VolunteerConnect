using AutoMapper;
using Volunteer_Project.Exceptions;
using Volunteer_Project.Interface.RepositoryInterface;
using Volunteer_Project.Interface.ServiceInterface;
using Volunteer_Project.Models;
using Volunteer_Project.Repository;
using Volunteer_Project.RequestModel;

namespace Volunteer_Project.Services
{
    public class RequestDetailService : IRequestDetailService
    {
         #region Fields
        private readonly IRequestDetailRepo _requestDetailRepo;
        private readonly IMapper _mapper;
        #endregion

        #region Parameterized Constructor
        /// <summary>
        /// 
        /// </summary>
        /// <param name="requestDetailRepo"></param>
        /// <param name="mapper"></param>
        public RequestDetailService(IRequestDetailRepo requestDetailRepo, IMapper mapper)
        {
            _requestDetailRepo = requestDetailRepo;
            _mapper = mapper;
        }
        #endregion

        #region Add Request Detail Service
        /// <summary>
        /// Add Request Details 
        /// </summary>
        /// <param name="requestRequestDetails"></param>
        /// <returns></returns>
        public async Task<List<RequestRequestDetail>> Add_RequestDetail(List<RequestRequestDetail> requestRequestDetails)
        {

            if (requestRequestDetails.Count == 0)
            {
                throw new NullException("Request Details cannot be empty");
            }
            List<RequestRequestDetail> reqdet = new List<RequestRequestDetail>();

            List<RequestDetail> requests = _mapper.Map<List<RequestDetail>>(requestRequestDetails);

            foreach (var requestdetail in requests)
            {
                var requestMap = await _requestDetailRepo.Add(requestdetail);

                if (requestMap != null)
                {
                    var Next = _mapper.Map<RequestRequestDetail>(requestMap);
                    reqdet.Add(Next);
                }
            }
            return reqdet;
        }
        #endregion

    }
}
