using Volunteer_Project;
using Volunteer_Project.DTO;
using Volunteer_Project.Models;
using System.Security.Cryptography;
using System.Text;
using Volunteer_Project.Exceptions;
using FoodPortal.Repos;
using AutoMapper;
using Volunteer_Project.RequestModel;
using System.Threading.Tasks;
using Volunteer_Project.Interface.ServiceInterface;
using Volunteer_Project.Interface.RepositoryInterface;
using Volunteer_Project.ViewModel;
#nullable disable


namespace Volunteer_Project.Services
{
    public class VolunteerService : IVolunteerService
    {
        #region Fields
        private readonly IVolunteerDetailsCrud _volunteerRepo;
        private readonly ITokenGenerate _tokenService;
        private readonly IMapper _mapper;

        #endregion

        #region Parameterized Constructor
        /// <summary>
        /// 
        /// </summary>
        /// <param name="volunteerRepo"></param>
        /// <param name="tokenService"></param>
        public VolunteerService(IVolunteerDetailsCrud volunteerRepo, 
                                ITokenGenerate tokenService,IMapper mapper)
        {
            _volunteerRepo = volunteerRepo;
            _tokenService = tokenService;
            _mapper = mapper;
        }
        #endregion

        #region Service method to the check the user password
        /// <summary>
        /// 
        /// </summary>
        /// <param name="volunteerDTO"></param>
        /// <returns>return the volunteerDTO</returns>
        /// <exception cref="NullException"></exception>
        public async Task<ViewToken> LogIN(VolunteerDTO volunteerDTO)
        {
            ViewToken user;
            var userData = await _volunteerRepo.GetValue(volunteerDTO);
            if (userData != null)
            {
                var hmac = new HMACSHA512(userData.Hashkey);
                var userPass = hmac.ComputeHash(Encoding.UTF8.GetBytes(volunteerDTO.Password));
                for (int i = 0; i < userPass.Length; i++)
                {
                    if (userPass[i] != userData.Password[i])
                        throw new NullException("user Password does not match");
                }
                user = new ViewToken();
                user.Token = _tokenService.GenerateToken(userData);
                return user;
            }
            throw new NullException("this user name does not exist ");
        }
        #endregion

        #region Service method to register the user
        /// <summary>
        /// 
        /// </summary>
        /// <param name="volunteerRegisterDTO"></param>
        /// <returns>return the volunteerDTO</returns>
        /// <exception cref="NullException"></exception>
        public async Task<ViewVolunteerRegisterDetails> Register(RequestVolunterRegister requestVolunterRegister)
        {
            VolunteerDetail newVolunteerDetail = _mapper.Map<VolunteerDetail>(requestVolunterRegister);
            using (var hmac = new HMACSHA512())
            {
                newVolunteerDetail.Password = hmac.ComputeHash(Encoding.UTF8.GetBytes(requestVolunterRegister.VolunteerPassword));
                newVolunteerDetail.Hashkey = hmac.Key;
                var resultUser = await _volunteerRepo.Add(newVolunteerDetail);
                if (resultUser != null)
                {
                   var map = _mapper.Map<ViewVolunteerRegisterDetails>(resultUser);
                   return map;
                }
                throw new NullException("Register not happened");
            }
        }
        #endregion
    }
}
