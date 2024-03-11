using System;
using System.Collections.Generic;

namespace Volunteer_Project.Models;

public partial class VolunteerMapping
{
    public int Id { get; set; }

    public int? RequestId { get; set; }

    public int? VolunteerId { get; set; }

    public int? DonationItemId { get; set; }

    public virtual DisasterNeed? DonationItem { get; set; }

    public virtual Request? Request { get; set; }

    public virtual VolunteerDetail? Volunteer { get; set; }
}
