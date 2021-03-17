using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<ActivitityDTO>
        {
            //we give a property so we can specify the id of what we want to return
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ActivitityDTO>
        {
            private readonly DataContext _context;
            private readonly IMapper __mapper;

            public Handler(DataContext context, IMapper _mapper)
            {
                __mapper = _mapper;
                _context = context;

            }
            public async Task<ActivitityDTO> Handle(Query request, CancellationToken cancellationToken)
            {

                var activity = await _context.Activities
                .FindAsync(request.Id);

                if (activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Activity = "Activity not Found" });
                }

                var actReturn = __mapper.Map<Activity, ActivitityDTO>(activity);
                return actReturn;
            }
        }
    }
}