namespace Volunteer_Project.ViewModel
{
    public class ViewRequestDetailsByPhoneNumber
    {
        public int Request_id { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public int? Count { get; set; }
        public string? DisasterName { get; set; }

    }
}
