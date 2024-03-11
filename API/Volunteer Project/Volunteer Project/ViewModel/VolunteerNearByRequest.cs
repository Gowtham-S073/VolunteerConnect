namespace Volunteer_Project.ViewModel
{
    public class VolunteerNearByRequest
    {
        public int UserId { get; set; }
        public long? PhoneNumber { get; set; }
        public int Request_id { get; set; }

        public decimal RequestLatitude { get; set; }

        public decimal RequestLongitude { get; set; }

        public int? Count { get; set; }

    }
}
