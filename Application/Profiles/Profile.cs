using System.Collections.Generic;
using System.Text.Json.Serialization;
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

        [JsonPropertyName("following")]
        public bool isFollowed { get; set; }

        public int FollowersCount { get; set; }

        public int FollowingCount { get; set; }

        public  ICollection<Photo> Photos { get; set; }
    }
}