namespace Volunteer_Project.ViewModel
{
    public class RequestsByRequestId
    {
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public int? Count { get; set; }
        public string? AdditionalDetails { get; set; }
        public string DisasterName { get; set; } = null!;
        public string Items { get; set; } = null!;


        
    }
}
