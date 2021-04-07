using System;

namespace Application.Comment
{
    public class CommentDTO
    {
         public Guid Id { get; set; }

        public string Body { get; set; }

        public string  Username { get; set; }

        public string DisplayName { get; set; }

        public string Photos { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}