using Volunteer_Project.DTO;
using Volunteer_Project.Models;

namespace Volunteer_Project.Interface.RepositoryInterface
{
    public interface IVolunteerDetailsCrud
    {
        Task<VolunteerDetail> Add(VolunteerDetail item);
        Task<VolunteerDetail> Update(VolunteerDetail item);
        Task<VolunteerDetail> Delete(VolunteerDTO item);
        Task<VolunteerDetail> GetValue(VolunteerDTO item);
        Task<List<VolunteerDetail>> GetAll();
    }
}
