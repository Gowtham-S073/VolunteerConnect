using System;
using System.Collections.Generic;

namespace Volunteer_Project.Models;

public partial class User
{
    public int UserId { get; set; }

    public long? PhoneNumber { get; set; }

    public virtual ICollection<Request> Requests { get; set; } = new List<Request>();
}
