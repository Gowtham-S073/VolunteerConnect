
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Volunteer_Project.DTO;
using Volunteer_Project.Exceptions;
using Volunteer_Project.Interface.RepositoryInterface;
using Volunteer_Project.Models;

namespace FoodPortal.Repos
{
    public class VolunteerRepo : IVolunteerDetailsCrud
    {
        #region Field
        private readonly VanContext _context;
        #endregion

        #region Parameterized constructor
        public VolunteerRepo(VanContext context)
        {
            _context = context;
        }
        #endregion

        #region Repo method to add User to the database
        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns>Add user </returns>
        /// <exception cref="NullException"></exception>
        /// <exception cref="DuplicateRecordException"></exception>
        /// <exception cref="InvalidSqlException"></exception>
        public async Task<VolunteerDetail> Add(VolunteerDetail volunteer)
        {
            try
            {
                if (volunteer == null)
                {
                    throw new NullException("user details must not be empty");
                }
                var users = _context.VolunteerDetails;
                var myUser = await users.SingleOrDefaultAsync(u => u.EmailId == volunteer.EmailId);
                if (myUser == null)
                {
                    await _context.VolunteerDetails.AddAsync(volunteer);
                    await _context.SaveChangesAsync();
                    return volunteer;
                }
                throw new DuplicateRecordException("this user is already exist");
            }
            catch (Exception ex)
            {
                throw new InvalidSqlException(ex.Message);
            }
        }
        #endregion

        #region Repo method to delete user from the database
        /// <summary>
        /// 
        /// </summary>
        /// <param name="volunteerDTO"></param>
        /// <returns>Delete user</returns>
        /// <exception cref="NullException"></exception>
        /// <exception cref="InvalidSqlException"></exception>
        public async Task<VolunteerDetail> Delete(VolunteerDTO volunteerDTO)
        {
            try
            {
                var users = _context.VolunteerDetails;
                var myUser = users.SingleOrDefault(u => u.EmailId == volunteerDTO.EmailId);
                if (myUser != null)
                {
                    _context.VolunteerDetails.Remove(myUser);
                    await _context.SaveChangesAsync();
                    return myUser;
                }
                throw new NullException("this User does not exist");
            }
            catch (Exception ex) { throw new InvalidSqlException(ex.Message); }
        }
        #endregion

        #region Repo method to get the user by username from database
        /// <summary>
        /// 
        /// </summary>
        /// <param name="volunteerDTO"></param>
        /// <returns>Get user by username</returns>
        /// <exception cref="NullException"></exception>
        /// <exception cref="InvalidSqlException"></exception>
        public async Task<VolunteerDetail> GetValue(VolunteerDTO volunteerDTO)
        {
            try
            {
                var users = await GetAll();
                if (users != null)
                {
                    var user = users.FirstOrDefault(u => u.EmailId == volunteerDTO.EmailId);
                    if (user != null)
                    {
                        return user;
                    }
                }
                throw new NullException("this User does not exist");
            }
            catch (Exception ex) { throw new InvalidSqlException(ex.Message); }
        }
        #endregion

        #region Repo method to get all the user from the database
        /// <summary>
        /// 
        /// </summary>
        /// <returns>Get all user</returns>
        /// <exception cref="NullException"></exception>
        /// <exception cref="InvalidSqlException"></exception>
        public async Task<List<VolunteerDetail>> GetAll()
        {
            try
            {
                var users = await _context.VolunteerDetails.ToListAsync();
                if (users != null)
                    return users;
                throw new NullException(" User does not exist");
            }
            catch (Exception ex) { throw new InvalidSqlException(ex.Message); }
        }
        #endregion

        #region Repo method to update user to the database
        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns>Update user</returns>
        /// <exception cref="NullException"></exception>
        /// <exception cref="InvalidSqlException"></exception>
        public async Task<VolunteerDetail> Update(VolunteerDetail volunteer)
        {
            try
            {
                var users = await GetAll();
                if (users != null)
                {
                    var Newuser = users.FirstOrDefault(u => u.EmailId == volunteer.EmailId);
                    if (Newuser != null)
                    {
                        _context.VolunteerDetails.Update(Newuser);
                        await _context.SaveChangesAsync();
                        return Newuser;
                    }
                    throw new NullException("this User does not exist");
                }
                throw new NullException("User does not be empty");
            }
            catch (Exception ex) { throw new InvalidSqlException(ex.Message); }

        }
        #endregion
    }
}
