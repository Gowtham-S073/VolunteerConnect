using AutoMapper;
using Volunteer_Project.Exceptions;
using Volunteer_Project.Interface.RepositoryInterface;
using Volunteer_Project.Interface.ServiceInterface;
using Volunteer_Project.Models;
using Volunteer_Project.RequestModel;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Services
{
    public class RequestService : IRequestService
    {
        #region Fields
        private readonly IRequestRepo _requestRepo;
        private readonly IMapper _mapper;
        #endregion

        #region Parameterized Constructor
        /// <summary>
        /// 
        /// </summary>
        /// <param name="requestRepo"></param>
        /// <param name="mapper"></param>
        public RequestService(IRequestRepo requestRepo, IMapper mapper)
        {
            _requestRepo = requestRepo;
            _mapper = mapper;
        }
        #endregion

        public async Task<RequestUserRequest> AddRequest(RequestUserRequest requestUserRequest)
        {
            if(requestUserRequest == null)
            {
                throw new NullException("Request cannot be empty");
            }
            var newRecord = _mapper.Map<Request>(requestUserRequest);
            var result = await _requestRepo.AddRequest(newRecord);
            var finalResult = _mapper.Map<RequestUserRequest>(result);
            return finalResult;
        }

        #region Requests by id
        public async Task<List<RequestsByRequestId>> RequestsbyId(int id)
        {
            var request = await _requestRepo.GetRequestId(id);
            return request;
        }
        #endregion

        #region method to get the pending requests by request id
        public async Task<List<ViewPendingRequestByRequestId>> GetPendingRequests(int requestId)
        {
            var request = await _requestRepo.GetPendingRequest(requestId);
            return request;
        }
        #endregion

        #region
        public async Task<List<ViewRequestsForVolunteers>> GetRequestsForVolunteer()
        {
            var request = await _requestRepo.RequestsForVolunteers();
            return request;
        }
        #endregion
    }
}
