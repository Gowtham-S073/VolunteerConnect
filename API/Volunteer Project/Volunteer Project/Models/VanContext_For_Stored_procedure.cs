using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Models
{
    public partial class VanContext:DbContext
    {
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ViewRequest>().HasNoKey();
            modelBuilder.Entity<VolunteerNearByRequest>().HasNoKey();
            modelBuilder.Entity<ViewRequestDetailsByPhoneNumber>().HasNoKey();
            modelBuilder.Entity<RequestsByRequestId>().HasNoKey();
            modelBuilder.Entity<ViewPendingRequestByRequestId>().HasNoKey();
            modelBuilder.Entity<ViewRequestsForVolunteers>().HasNoKey();
        }

        public async Task<List<ViewRequest>> UspGetRequestsByVolunteerIdAsync(int volunteerId,int radius)
        {
            return await Set<ViewRequest>().FromSqlRaw("EXEC GetRequestsByVolunteerId @VolunteerId, @Radius",
                new SqlParameter("@VolunteerId", volunteerId),
                new SqlParameter("@Radius", radius)
                ).ToListAsync();

        }

        public async Task<List<ViewRequestDetailsByPhoneNumber>> RequestDetailsByPhoneNumber(long phoneNumber)
        {
            return await Set<ViewRequestDetailsByPhoneNumber>()
                .FromSqlRaw("EXEC GetRequestDetailsByPhoneNumber @PhoneNumber", 
                new SqlParameter("@PhoneNumber", phoneNumber))
                .ToListAsync();
        }

        public async Task<List<RequestsByRequestId>> RequestDetailsById(int RequestId)
        {
            return await Set<RequestsByRequestId>()
                .FromSqlRaw("EXEC GetRequestDetailsByRequestId @RequestId",
                new SqlParameter("@RequestId",RequestId)).ToListAsync();
        }

        public async Task<List<ViewPendingRequestByRequestId>> PendingRequest(int requestId)
        {
            return await Set<ViewPendingRequestByRequestId>()
                .FromSqlRaw("EXEC PendingRequestByRequestId @Requestid",
                new SqlParameter("@Requestid", requestId)).ToListAsync();
        }

        public async Task<List<ViewRequestsForVolunteers>> RequestsDisplay()
        {
            return await Set<ViewRequestsForVolunteers>().FromSqlRaw("EXEC USPWaitingRequest").ToListAsync();
        }
    }
}
