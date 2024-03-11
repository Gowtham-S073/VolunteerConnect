using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Volunteer_Project.Exceptions;
using Volunteer_Project.Interface.RepositoryInterface;
using Volunteer_Project.Models;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Repository
{
    public class VolunteerMappingRepo : IVolunteerMappingRepo
    {
        #region Field
        private readonly VanContext _context;
        #endregion

        #region Parameterized constructor
        public VolunteerMappingRepo(VanContext context)
        {
            _context = context;
        }
        #endregion


        #region Repo method to add the Volunteer Mapping Detail to database
        /// <summary>
        /// 
        /// </summary>
        /// <param name="item"></param>
        /// <returns>added data in Volunteer Mapping </returns>
        /// <exception cref="NullException"></exception>
        /// <exception cref="InvalidSqlException"></exception>
        public async Task<VolunteerMapping> Add(VolunteerMapping item)
        {
            try
            {
                if (item == null)
                {
                    throw new NullException("must not be empty");
                }
                    await _context.VolunteerMappings.AddAsync(item);
                    await _context.SaveChangesAsync();
                    return item;
            }
            catch (Exception ex)
            {
                throw new InvalidSqlException(ex.Message);
            }
        }
        #endregion

        #region Repo method to get all the Volunteer Mapping Details from the database
        /// <summary>
        /// 
        /// </summary>
        /// <returns>Get all the Volunteer Mapping details</returns>
        /// <exception cref="NullException"></exception>
        /// <exception cref="InvalidSqlException"></exception>

        public async Task<List<VolunteerMapping>> GetAll()
        {
            try
            {
                var volunteer = await _context.VolunteerMappings.ToListAsync();
                if (volunteer == null)
                {
                    throw new NullException("Volunteer Mapping table is empty");
                   
                }
                return volunteer;

            }
            catch (Exception ex)
            {
                throw new InvalidSqlException(ex.Message);
            }
        }
        #endregion

        public async Task<List<ViewRequest>> Get_Nearby_Request(int volunteerId, int radius)
        {
            var result = await _context.UspGetRequestsByVolunteerIdAsync(volunteerId, radius);
            return result;
        }


    }
}
