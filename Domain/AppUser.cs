using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string  DisplayName { get; set; }

        public string Bio { get; set; }

        public virtual ICollection<UserActivity> UserActivities { get; set; }

        //One to many relationship
        public virtual ICollection<Photo> Photos {get; set;}
    }
}