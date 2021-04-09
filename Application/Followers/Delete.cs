using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Followers
{
         public class Delete
    {
        public class Command : IRequest
        {
            public string Username { get; set; }
        }


        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _accessor;
            public Handler(DataContext context, IUserAccessor accessor)
            {
                _accessor = accessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var userObserver = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _accessor.getUsername());

                var target = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);

                if(target == null) {
                    throw new RestException(HttpStatusCode.NotFound, new {Error = "User not found"});
                }

                //check to see if there is exsisting following

                var following = await _context.Followings.SingleOrDefaultAsync(f => f.ObserverId == userObserver.Id && f.TargetId == target.Id);

                if(following == null) {

                    throw new RestException(HttpStatusCode.BadRequest, new {Error = "Not following this user"});
                }

                 _context.Followings.Remove(following);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }

    }


}
