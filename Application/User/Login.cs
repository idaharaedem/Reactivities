using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistance;

namespace Application.User
{
    public class Login
    {
        public class Query : IRequest<User>
        {
            public string Email { get; set; }

            public string Password { get; set; }

        }
        //Incase they dont add the passord or email you can just end the request here 
        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();

            }
        }


        public class Handler : IRequestHandler<Query, User>
        {
            //Need the user manager for the users as well as the sign in manager to compare the passwords
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            private readonly IJwttGenerator _generator;
            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwttGenerator generator)
            {
                _generator = generator;
                _signInManager = signInManager;
                _userManager = userManager;

            }

            public async Task<User> Handle(Query requests, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(requests.Email);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.Unauthorized);
                }

                var result = await _signInManager.CheckPasswordSignInAsync(user, requests.Password, false);

                if (result.Succeeded)
                {
                    //Generate Token

                    return new User
                    {
                        Displayname = user.DisplayName,
                        Token = _generator.createToken(user),
                        Username = user.UserName,
                        Image = user.Photos.FirstOrDefault(x => x.isMain)?.Url
                    };
                }

                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}