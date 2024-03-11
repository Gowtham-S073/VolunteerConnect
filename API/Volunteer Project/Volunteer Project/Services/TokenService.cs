using Volunteer_Project.Models;
using Volunteer_Project.DTO;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Volunteer_Project.Interface.ServiceInterface;
#nullable disable


namespace Volunteer_Project.Services
{
    public class TokenService : ITokenGenerate
    {
        #region Field
        private readonly SymmetricSecurityKey _key;
        #endregion

        #region Parameterized Constructor
        /// <summary>
        /// 
        /// </summary>
        /// <param name="configuration"></param>
        public TokenService(IConfiguration configuration)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenKey"]));
        }
        #endregion

        #region service method to generate token based on user
        /// <summary>
        /// 
        /// </summary>
        /// <param name="volunteerDTO"></param>
        /// <returns> token in string data type</returns>
        public string GenerateToken(VolunteerDetail volunteerDTO)
        {
            string token = string.Empty;
            //User identity
            var claims = new List<Claim>
            {
                new Claim("VolunteerId",(volunteerDTO.VolunteerId).ToString()),
                new Claim(ClaimTypes.Email,volunteerDTO.EmailId),
                new Claim("PhoneNumber",volunteerDTO.PhoneNo),
                new Claim(ClaimTypes.Name,volunteerDTO.VolunteerName)
            };
            //Signature algorithm
            var cred = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256);
            //Assembling the token details
            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = cred
            };
            //Using teh handler to generate the token
            var tokenHandler = new JwtSecurityTokenHandler();
            var myToken = tokenHandler.CreateToken(tokenDescription);
            token = tokenHandler.WriteToken(myToken);
            return token;
        }
        #endregion
    }
}
