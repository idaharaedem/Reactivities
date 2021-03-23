using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Profile>
        {
            public string Username { get; set; }
        }


        public class Handler : IRequestHandler<Query, Profile>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, UserManager<AppUser> userManager, IUserAccessor userAccessor)
            {
                _userManager = userManager;
                _context = context;
            }

            public async Task<Profile> Handle(Query requests, CancellationToken cancellationToken)
            {

                var user = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == requests.Username);

                return new Profile
                {
                    DisplayName = user.DisplayName,
                    Username = user.UserName,
                    MainImage = user.Photos.FirstOrDefault(x => x.isMain)?.Url,
                    Photos = user.Photos,
                    Bio = user.Bio
                };
            }
        }
    }
}