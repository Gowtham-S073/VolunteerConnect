using AutoMapper;
using Volunteer_Project.Interface.RepositoryInterface;
using Volunteer_Project.Interface.ServiceInterface;
using Volunteer_Project.Models;
using Volunteer_Project.RequestModel;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Services
{
    public class UserService : IUserService
    {
        #region Fields
        private readonly IUserRepo _userRepo;
        private readonly IMapper _mapper;
        #endregion

        #region Parameterized Constructor
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userRepo"></param>
        /// <param name="mapper"></param>
        public UserService(IUserRepo userRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _mapper = mapper;
        }
        #endregion

        #region Add Request Detail Service
        /// <summary>
        /// Add Request Details 
        /// </summary>
        /// <param name="requestNewUser"></param>
        /// <returns></returns>
        public async Task<RequestNewUser> AddUser(RequestNewUser requestNewUser)
        {
            RequestNewUser requestNewUsers = new RequestNewUser();
            User addUser = _mapper.Map<User>(requestNewUser);
            var addUserMap = await _userRepo.Add(addUser);
            RequestNewUser addedNewUser = _mapper.Map<RequestNewUser>(addUserMap);
            return addedNewUser;
        }
        #endregion

        #region This method call the Repository method which Executes the Stored Procedure 
        public async Task<List<ViewRequestDetailsByPhoneNumber>> GetUserDetailsbyPhoneNumber(long phoneNUmber)
        {
            return await _userRepo.GetRequestDetailsByPhoneNumber(phoneNUmber);

        }
        #endregion
    }
}
