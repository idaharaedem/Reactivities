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

namespace Application.Activities
{
    public class Attend
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
                    throw new RestException(HttpStatusCode.NotFound, new{Activity = "No activity Found"});
                };
                //cannot use find async because the username is not the primary key of users database
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _accessor.getUsername());

                var attendance = await _context.UserActivities
                .SingleOrDefaultAsync(x => x.ActivityId == activity.Id && x.AppUserId == user.Id);

                if (attendance != null) 
                {
                    throw new RestException(HttpStatusCode.BadRequest, new {Attendance = "Already attending event"});
                }

                attendance = new UserActivity
                {
                    Activity = activity,
                    AppUser = user,
                    Date = DateTime.Now,
                    IsHost = false  
                };

                _context.UserActivities.Add(attendance);

                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Unit.Value;

                throw new Exception ("Problem saving changes");
            }
        }

    }
}