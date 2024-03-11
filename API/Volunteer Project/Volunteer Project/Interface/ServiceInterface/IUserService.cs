using Volunteer_Project.RequestModel;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Interface.ServiceInterface
{
    public interface IUserService
    {
        Task<RequestNewUser> AddUser(RequestNewUser requestNewUsers);
        Task<List<ViewRequestDetailsByPhoneNumber>> GetUserDetailsbyPhoneNumber(long phoneNUmber);
    }
}
