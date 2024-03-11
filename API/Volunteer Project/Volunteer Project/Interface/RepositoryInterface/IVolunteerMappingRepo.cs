using Volunteer_Project.Models;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Interface.RepositoryInterface
{
    public interface IVolunteerMappingRepo
    {
        Task<VolunteerMapping> Add(VolunteerMapping item);
        Task<List<VolunteerMapping>> GetAll();
        Task<List<ViewRequest>> Get_Nearby_Request(int volunteerId, int radius);

    }
}
