using Microsoft.EntityFrameworkCore;
using Volunteer_Project.Exceptions;
using Volunteer_Project.Interface.RepositoryInterface;
using Volunteer_Project.Models;

namespace Volunteer_Project.Repository
{
    public class DisasterNeedsRepo : IDisasterNeedsRepo
    {
        #region Field
        private readonly VanContext _context;
        #endregion

        #region Parameterized constructor
        public DisasterNeedsRepo(VanContext context)
        {
            _context = context;
        }
        #endregion

        #region 
        /// <summary>
        /// 
        /// </summary>
        /// <param name="need"></param>
        /// <returns>the added Data in Request Details </returns>
        /// <exception cref="NullException"></exception>
        /// <exception cref="InvalidSqlException"></exception>
        public async Task<DisasterNeed> Add_DisasterNeeds(DisasterNeed need)
        {
            try
            {
                await _context.DisasterNeeds.AddAsync(need);
                await _context.SaveChangesAsync();
                return need;
            }
            catch (Exception ex)
            {
                throw new InvalidSqlException(ex.Message);
            }
        }
        #endregion

        public async Task<List<DisasterNeed>> getAllDisasterneeds()
        {
            var result = await  _context.DisasterNeeds.ToListAsync();
            return result;
        }
    }
}
