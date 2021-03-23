using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest<User>
        {
            public string DisplayName { get; set; }
            public string UserName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.Password).Password();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
            }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwttGenerator _generator;
            public Handler(DataContext context, UserManager<AppUser> userManager, IJwttGenerator generator)
            {
                _generator = generator;
                _userManager = userManager;
                _context = context;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                var emailExists = await _context.Users.AnyAsync(e => e.Email == request.Email);
                var userName = await _context.Users.AnyAsync(e => e.UserName == request.UserName);

                if(emailExists) {
                    throw new RestException(HttpStatusCode.BadRequest, new {Email = "Email already exists"});
                }

                 if(userName) {
                    throw new RestException(HttpStatusCode.BadRequest, new {UserName = "UserName already in use"});
                }

                var user = new AppUser {

                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    UserName = request.UserName  
                };

                var result = await _userManager.CreateAsync(user, request.Password);

                if(result.Succeeded) 
                {
                    return new User 
                    {
                        Displayname = user.DisplayName,
                        Token = _generator.createToken(user),
                        Image = user.Photos.FirstOrDefault(x => x.isMain)?.Url,
                        Username = request.UserName
                    };
                }

                throw new Exception("Problem registering User");

            }
        }
    }
}