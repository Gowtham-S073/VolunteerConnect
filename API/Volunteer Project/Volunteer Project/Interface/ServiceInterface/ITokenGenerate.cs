using Volunteer_Project.Models;
using Volunteer_Project.DTO;

namespace Volunteer_Project.Interface.ServiceInterface
{
    public interface ITokenGenerate
    {
        public string GenerateToken(VolunteerDetail volunteer);

    }
}
