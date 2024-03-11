namespace Volunteer_Project.RequestModel
{
    public class RequestUserRequest
    {
        public int RequestId { get; set; }
        public decimal Latitude { get; set; }

        public decimal Longitude { get; set; }

        public int? Count { get; set; }

        public int? UserId { get; set; }

        public int DisasterId { get; set; }

        public string? AdditionalDetails { get; set; }

    }
}
    