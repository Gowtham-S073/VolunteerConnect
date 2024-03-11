using Volunteer_Project.Models;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Interface.RepositoryInterface
{
    public interface IRequestDetailRepo
    {
        Task<RequestDetail> Add(RequestDetail item);
    }
}
