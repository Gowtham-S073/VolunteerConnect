using Volunteer_Project.Models;

namespace Volunteer_Project.RequestModel
{
    public class RequestDisasterNeeds
    {
        public int DonationItemId { get; set; }

        public string? Items { get; set; }
    }
}
