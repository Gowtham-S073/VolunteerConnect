using Volunteer_Project.DTO;
using Volunteer_Project.Models;

namespace Volunteer_Project.Interface.RepositoryInterface
{
    public interface IDisasterNeedsRepo
    {
        Task<DisasterNeed> Add_DisasterNeeds(DisasterNeed disasterNeeds);
        Task<List<DisasterNeed>> getAllDisasterneeds();
    }
}
