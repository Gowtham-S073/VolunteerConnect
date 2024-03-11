namespace Volunteer_Project.RequestModel
{
    public class RequestVolunteerMapping
    {

        public int Id { get; set; }

        public int? RequestId { get; set; }

        public int? VolunteerId { get; set; }

        public int? DonationItemId { get; set; }
    }
}
