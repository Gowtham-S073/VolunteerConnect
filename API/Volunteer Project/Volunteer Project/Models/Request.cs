using System;
using System.Collections.Generic;

namespace Volunteer_Project.Models;

public partial class Request
{
    public int RequestId { get; set; }

    public decimal Latitude { get; set; }

    public decimal Longitude { get; set; }

    public int? Count { get; set; }

    public int? UserId { get; set; }

    public int DisasterId { get; set; }

    public string? AdditionalDetails { get; set; }

    public virtual Disaster Disaster { get; set; } = null!;

    public virtual ICollection<RequestDetail> RequestDetails { get; set; } = new List<RequestDetail>();

    public virtual User? User { get; set; }

    public virtual ICollection<VolunteerMapping> VolunteerMappings { get; set; } = new List<VolunteerMapping>();
}
