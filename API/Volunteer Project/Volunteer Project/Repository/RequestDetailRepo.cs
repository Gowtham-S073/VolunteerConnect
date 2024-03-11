using Volunteer_Project.Exceptions;
using Volunteer_Project.Interface.RepositoryInterface;
using Volunteer_Project.Models;

namespace Volunteer_Project.Repository
{
    public class RequestDetailRepo : IRequestDetailRepo
    {
        #region Field
        private readonly VanContext _context;
        #endregion

        #region Parameterized constructor
        public RequestDetailRepo(VanContext context)
        {
            _context = context;
        }
        #endregion

        #region Repo method to add the RequestDetail Detail to database
        /// <summary>
        /// 
        /// </summary>
        /// <param name="item"></param>
        /// <returns>the added Data in Request Details </returns>
        /// <exception cref="NullException"></exception>
        /// <exception cref="InvalidSqlException"></exception>
        public async Task<RequestDetail> Add(RequestDetail item)
        {       
                await _context.RequestDetails.AddAsync(item);
                await _context.SaveChangesAsync();
                return item;
        }
        #endregion
    }
}
