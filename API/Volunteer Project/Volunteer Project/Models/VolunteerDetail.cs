using System;
using System.Collections.Generic;

namespace Volunteer_Project.Models;

public partial class VolunteerDetail
{
    public int VolunteerId { get; set; }

    public string? VolunteerName { get; set; }

    public string? PhoneNo { get; set; }

    public string? EmailId { get; set; }

    public byte[] Password { get; set; } = null!;

    public byte[] Hashkey { get; set; } = null!;

    public string? Status { get; set; }

    public decimal Latitude { get; set; }

    public decimal Longitude { get; set; }

    public virtual ICollection<VolunteerMapping> VolunteerMappings { get; set; } = new List<VolunteerMapping>();
}
