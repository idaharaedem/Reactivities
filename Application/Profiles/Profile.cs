using System.Collections.Generic;
using Domain;

namespace Application.Profiles
{
    //properties we want to return for a users profile
    public class Profile
    {
        public string DisplayName { get; set; }

        public string Username { get; set; }

        public string MainImage { get; set; }

        public string Bio { get; set; }

        public  ICollection<Photo> Photos { get; set; }
    }
}