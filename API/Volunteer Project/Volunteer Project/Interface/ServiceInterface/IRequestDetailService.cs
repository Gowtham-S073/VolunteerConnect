using Volunteer_Project.RequestModel;

namespace Volunteer_Project.Interface.ServiceInterface
{
    public interface IRequestDetailService
    {
        Task<List<RequestRequestDetail>> Add_RequestDetail(List<RequestRequestDetail> requestDetail);

    }
}
