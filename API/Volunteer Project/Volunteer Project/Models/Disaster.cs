using System;
using System.Collections.Generic;

namespace Volunteer_Project.Models;

public partial class Disaster
{
    public int DisasterId { get; set; }

    public string DisasterName { get; set; } = null!;

    public virtual ICollection<Request> Requests { get; set; } = new List<Request>();
}
