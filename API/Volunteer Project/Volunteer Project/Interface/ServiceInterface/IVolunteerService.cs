using Volunteer_Project.DTO;
using Volunteer_Project.RequestModel;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Interface.ServiceInterface
{
    public interface IVolunteerService
    {
        Task<ViewVolunteerRegisterDetails> Register(RequestVolunterRegister requestVolunterRegister);
        Task<ViewToken> LogIN(VolunteerDTO volunteerDTO);
    }
}
