using Volunteer_Project.Models;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Interface.RepositoryInterface
{
    public interface IUserRepo
    {
        Task<User> Add(User user);
        Task<List<ViewRequestDetailsByPhoneNumber>> GetRequestDetailsByPhoneNumber(long phoneNumber);
        Task<User> GetUserbyPhonenumber(long? phoneNumber);
    }
}
