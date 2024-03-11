using Volunteer_Project.Models;

namespace Volunteer_Project.Interface.RepositoryInterface
{
    public interface IDisasterRepo
    {
        Task<List<Disaster>> GetDisasters();
    }
}
