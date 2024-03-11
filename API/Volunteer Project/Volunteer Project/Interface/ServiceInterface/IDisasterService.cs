using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Interface.ServiceInterface
{
    public interface IDisasterService
    {
        Task<List<ViewDisasters>> GetallDisasters();
    }
}
