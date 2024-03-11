    using Volunteer_Project.Models;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Interface.RepositoryInterface
{
    public interface IRequestRepo
    {
        Task<Request> AddRequest(Request request);
        Task<List<RequestsByRequestId>> GetRequestId(int id);
        Task<List<ViewPendingRequestByRequestId>> GetPendingRequest(int requestId);
        Task<List<ViewRequestsForVolunteers>> RequestsForVolunteers();

    }
}
