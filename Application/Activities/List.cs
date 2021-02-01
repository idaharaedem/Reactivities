using System.Collections.Generic;

using System.Threading;
using System.Threading.Tasks;
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
        public class Query : IRequest<List<Activity>> { }

        //Need to get access to our data context
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities.ToListAsync();
                
                return activities;
            }
        }
    }
}