using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Application.interfaces;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Profiles
{
    public class ProfileReader : IProfileReader
    {
        private readonly DataContext _dataContext;
        private readonly IUserAccessor _accessor;
        public ProfileReader(DataContext dataContext, IUserAccessor accessor)
        {
            _accessor = accessor;
            _dataContext = dataContext;
        }

        //reading the profile of anyone you pass in as a name
        //because we want to inject this into other classes we add it to startup

        public async Task<Profile> ReadProfile(string username)
        {
            var user = await _dataContext.Users.SingleOrDefaultAsync(u=>u.UserName == username);

            if(user == null) {
                throw new RestException(HttpStatusCode.NotFound, new {Errors= "user not found"});
            };

            var currentUser = await _dataContext.Users.SingleOrDefaultAsync(x => x.UserName == _accessor.getUsername());

            //create profile youre returning
            var profile = new Profile 
            {
                    DisplayName = user.DisplayName,
                    Username = user.UserName,
                    MainImage = user.Photos.FirstOrDefault(x => x.isMain)?.Url,
                    Photos = user.Photos,
                    Bio = user.Bio,
                    FollowersCount = user.Followers.Count(),
                    FollowingCount = user.Following.Count(),
            };

            if(currentUser.Following.Any(x => x.TargetId == user.Id))
            {
                profile.isFollowed = true;
            }

            return profile;
        }
    }
}