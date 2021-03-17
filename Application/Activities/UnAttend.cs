using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Activities
{
    public class UnAttend
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var activity = await _context.Activities.FindAsync(request.Id);

                if(activity == null) 
                {
                    throw new RestException(HttpStatusCode.BadRequest, new {Activiy= "User Activity doesnt exist"});
                }

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _accessor.getUsername());

                var attendance = await _context.UserActivities
                .SingleOrDefaultAsync(x => x.ActivityId == activity.Id && x.AppUserId == user.Id);

                if(attendance == null) 
                {
                    return Unit.Value;
                }

                if(attendance.IsHost) {
                    throw new RestException(HttpStatusCode.BadRequest, new {Attendance = "Cannot remove host from list"});
                };

                _context.UserActivities.Remove(attendance);

                 var success = await _context.SaveChangesAsync() > 0;

                if(success) return Unit.Value;

                throw new Exception ("Problem saving changes");


            }
        }
    }
}