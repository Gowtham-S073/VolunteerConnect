using Microsoft.EntityFrameworkCore;
using Volunteer_Project.Exceptions;
using Volunteer_Project.Interface.RepositoryInterface;
using Volunteer_Project.Models;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Repository
{
    public class UserRepo : IUserRepo
    {
        #region Field
        private readonly VanContext _context;
        #endregion

        #region Parameterized constructor
        public UserRepo(VanContext context)
        {
            _context = context;
        }
        #endregion

        #region Add User
        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns>the added Data in Request Details </returns>
        /// <exception cref="NullException"></exception>
        /// <exception cref="InvalidSqlException"></exception>
        public async Task<User> Add(User user)
        {
            var exist = await GetUserbyPhonenumber(user.PhoneNumber);
            if(exist==null)
            {
                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
                var addedUser = await _context.Users.FindAsync(user.UserId);
                return addedUser;
            }
            return exist;

        }
        #endregion

        #region method to execute the stored procedure for get the request details by user's phone number
        public async Task<List<ViewRequestDetailsByPhoneNumber>> GetRequestDetailsByPhoneNumber(long phoneNumber)
        {
            var result = await _context.Users.SingleOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
            if (result == null)
            {
                throw new NullException("Invalid phone number");
            }
            return await _context.RequestDetailsByPhoneNumber(phoneNumber);
        }
        #endregion

        #region Get User by their Phone number
        public async Task<User> GetUserbyPhonenumber(long? phoneNumber)
        {
            var result = await _context.Users.SingleOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
            return result;
        }
        #endregion
    }
}
