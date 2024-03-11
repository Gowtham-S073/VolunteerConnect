namespace Volunteer_Project.RequestModel
{
    public class RequestVolunterRegister
    {
        public int VolunteerId { get; set; }

        public string? VolunteerName { get; set; }

        public string? PhoneNo { get; set; }

        public string? EmailId { get; set; }
        public string? Status { get; set; }

        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string? VolunteerPassword { get; set; }

    }
}
