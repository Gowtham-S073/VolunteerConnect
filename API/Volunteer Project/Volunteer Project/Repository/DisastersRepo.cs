using Microsoft.EntityFrameworkCore;
using Volunteer_Project.Interface.RepositoryInterface;
using Volunteer_Project.Models;

namespace Volunteer_Project.Repository
{
    public class DisastersRepo : IDisasterRepo
    {
        #region Field
        private readonly VanContext _context;
        #endregion

        #region Parameterized constructor
        public DisastersRepo(VanContext context)
        {
            _context = context;
        }
        #endregion


        #region Get all disasters
        public async Task<List<Disaster>> GetDisasters()
        {
            var result = await _context.Disasters.ToListAsync();
            return result;
        }
        #endregion
    }
}
