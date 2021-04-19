using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

//Responsible for receiving Http request and sending out responses
namespace Application.Activities
{
    public class List
    {

        public class ActivitiesEnvelope
        {
            public List<ActivitityDTO> Activities { get; set; }

            public int ActivityCount { get; set; }
        }

        //Need to create a query and a handler
        public class Query : IRequest<ActivitiesEnvelope>
        {
            public Query(int? limit, int? offset, bool isGoing, bool isHost, DateTime? startDate)
            {
                Limit = limit;
                Offset = offset;
                IsGoing = isGoing;
                IsHost = isHost;
                StartDate = startDate ?? DateTime.Now;
            }
            public int? Limit { get; set; }

            public int? Offset { get; set; }

            public bool IsGoing { get; set; }

            public bool IsHost { get; set; }

            public DateTime? StartDate { get; set; }
        }

        //Need to get access to our data context
        public class Handler : IRequestHandler<Query, ActivitiesEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _accessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor accessor)
            {
                _accessor = accessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<ActivitiesEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var querable =  _context.Activities.Where(x => x.Date >= request.StartDate)
                .OrderBy(x => x.Date)
                .AsQueryable();

                var user = await _context.Users.SingleOrDefaultAsync(a => a.UserName == _accessor.getUsername());

                if (request.IsGoing && !request.IsHost)
                {
                    //All activities the currently logged in user is going to
                    querable = querable.Where(x => x.UserActivities.Any(x => x.AppUser.UserName == _accessor.getUsername()));
                }

                if(request.IsHost && !request.IsGoing) 
                {
                     querable = querable.Where(x => x.UserActivities.Any(x => x.AppUser.UserName == _accessor.getUsername() && x.IsHost == true));
                }

                var activities = await querable
                .Skip(request.Offset ?? 0)
                .Take(request.Limit ?? 3).ToListAsync();

                return new ActivitiesEnvelope
                {
                    Activities = _mapper.Map<List<Activity>, List<ActivitityDTO>>(activities),
                    ActivityCount = querable.Count()
                };

            }
        }
    }
}