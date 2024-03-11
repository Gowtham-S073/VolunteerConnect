using Volunteer_Project.RequestModel;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Interface.ServiceInterface
{
    public interface IRequestService
    {
        Task<RequestUserRequest> AddRequest(RequestUserRequest requestUserRequest);
        Task<List<RequestsByRequestId>> RequestsbyId(int id);
        Task<List<ViewPendingRequestByRequestId>> GetPendingRequests(int requestId);
        Task<List<ViewRequestsForVolunteers>> GetRequestsForVolunteer();

    }
}
