using System;

namespace Domain
{
    //Join Table //Many to many relationship
    public class UserActivity
    {
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }

        public Guid ActivityId { get; set; }

        public virtual Activity Activity { get; set; }

        //Additional properties for attendies of activities

        public DateTime Date { get; set; }

        public bool IsHost { get; set; }
    }
}