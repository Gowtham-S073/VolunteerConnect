using Microsoft.EntityFrameworkCore;
using Volunteer_Project.Exceptions;
using Volunteer_Project.Interface.RepositoryInterface;
using Volunteer_Project.Models;
using Volunteer_Project.ViewModel;


namespace Volunteer_Project.Repository
{
    public class RequestRepo : IRequestRepo
    {
        #region Field
        private readonly VanContext _context;
        #endregion

        #region Parameterized constructor
        public RequestRepo(VanContext context)
        {
            _context = context;
        }
        #endregion

        #region Repo method to add the RequestDetail Detail to database
        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns>the added Data in Request Details </returns>
        /// <exception cref="NullException"></exception>
        /// <exception cref="InvalidSqlException"></exception>
        public async Task<Request> AddRequest(Request request)
        {
            await _context.Requests.AddAsync(request);
            await _context.SaveChangesAsync();
            var newRequest = await _context.Requests.FindAsync(request.RequestId);
            return newRequest;
        }
        #endregion


        #region Request Details by Request Id
        public async Task<List<RequestsByRequestId>> GetRequestId(int id)
        {
            var result = await _context.Requests.FirstOrDefaultAsync(r => r.RequestId == id);
            if (result == null)
            {
                throw new NullException("Invalid Request Id");
            }
            return await _context.RequestDetailsById(id);
            
        }
        #endregion

        #region
        public async Task<List<ViewPendingRequestByRequestId>> GetPendingRequest(int requestId)
        {
            var result = await _context.PendingRequest(requestId);
            if(result.Count() == 0)
            {
                throw new NullException("No Pending Requests");
            }
            return result;
        }
        #endregion

        #region  method to display requests to volunteers
        public async Task<List<ViewRequestsForVolunteers>> RequestsForVolunteers()
        {
            var requests = await _context.RequestsDisplay();
            if (requests.Count() == 0)
            {
                throw new NullException("No Requests");
            }
            return requests;
        }
        #endregion
    }
}