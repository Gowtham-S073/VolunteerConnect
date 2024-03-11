using Volunteer_Project.RequestModel;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Interface.ServiceInterface
{
    public interface IDisasterNeedsService
    {
        Task<RequestDisasterNeeds> Add_DisasterNeeds(RequestDisasterNeeds requestDisasterNeeds);
        Task<List<ViewDisasterneeds>> viewAllDisasterNeed();
    }
}
