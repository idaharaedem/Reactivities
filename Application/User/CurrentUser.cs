using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistance;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { }


        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwttGenerator _generator;
            private readonly IUserAccessor _userAccessor;
            public Handler(UserManager<AppUser> userManager, IJwttGenerator generator, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _generator = generator;
                _userManager = userManager;

            }

            public async Task<User> Handle(Query requests, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_userAccessor.getUsername());

                return new User 
                {
                    Displayname =  user.DisplayName,
                    Username = user.UserName,
                    Token = _generator.createToken(user),
                    Image = user.Photos.FirstOrDefault(x => x.isMain)?.Url
                };
            
            }
        }
    }
}