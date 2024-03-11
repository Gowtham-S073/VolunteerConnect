namespace Volunteer_Project.ViewModel
{
    public class ViewRequestsForVolunteers
    {
        public int? Request_id { get; set; }
        public int DisasterId { get; set; }
        public decimal Longitude { get; set; }
        public decimal Latitude { get; set; }
        public int Count { get; set; }
        public string? AdditionalDetails { get; set; }
        public long? PhoneNumber { get; set; }
        public string? DisasterName { get; set; } 


    }
}
