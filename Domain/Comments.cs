using System;

namespace Domain
{
    public class Comments
    {
        public Guid Id { get; set; }

        public string Body { get; set; }

        public virtual AppUser Author { get; set; }

        //each activity will have a collection of comments
        public virtual Activity Activity  { get; set; }   

        public DateTime CreatedAt { get; set; }
    }
}