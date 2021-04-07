using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Comment
{
    public class Create
    {
        // will have to return the comment for anyone else connected to the activity
        public class Command : IRequest<CommentDTO>
        {
            public string Body { get; set; }

            public Guid ActivityId { get; set; }

            public string Username { get; set; }
        }


        public class Handler : IRequestHandler<Command, CommentDTO>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            } 

            public async Task<CommentDTO> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FirstOrDefaultAsync(a => a.Id == request.ActivityId);

                if(activity == null) {

                    throw new RestException(HttpStatusCode.BadRequest, new {Comment = "No activity found"});    
                }

                var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == request.Username);

                var comment = new Comments
                {
                   Author = user,
                   Body = request.Body,
                   Activity = activity,
                   CreatedAt = DateTime.Now
                };

                //adding to the list of comments on said activity
                activity.Comments.Add(comment);


                var success = await _context.SaveChangesAsync() > 0;

                if (success) return _mapper.Map<CommentDTO>(comment);

                throw new Exception("Problem saving changes");
            }
        }

    }
}