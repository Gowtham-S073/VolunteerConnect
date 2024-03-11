using System;
using System.Collections.Generic;

namespace Volunteer_Project.Models;

public partial class DisasterNeed
{
    public int DonationItemId { get; set; }

    public string Items { get; set; } = null!;

    public virtual ICollection<RequestDetail> RequestDetails { get; set; } = new List<RequestDetail>();

    public virtual ICollection<VolunteerMapping> VolunteerMappings { get; set; } = new List<VolunteerMapping>();
}
