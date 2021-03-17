using System.Collections.Generic;

using System.Threading;
using System.Threading.Tasks;
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
        //Need to create a query and a handler
        public class Query : IRequest<List<ActivitityDTO>> { }

        //Need to get access to our data context
        public class Handler : IRequestHandler<Query, List<ActivitityDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper __mapper;
            public Handler(DataContext context, IMapper _mapper)
            {
                __mapper = _mapper;
                _context = context;
            }

            public async Task<List<ActivitityDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities
                .ToListAsync();

                var retActivities = __mapper.Map<List<Activity>, List<ActivitityDTO>>(activities);
                return retActivities;
            }
        }
    }
}