using Volunteer_Project.RequestModel;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Interface.ServiceInterface
{
    public interface IVolunteerMappingService
    {
        Task<List<RequestVolunteerMapping>> Add_VolunteerMapping(List<RequestVolunteerMapping> requestVolunteerMapping);
        Task<List<ViewRequest>> Get_Nearby_Request(int volunteerId, int radius);


    }
}
