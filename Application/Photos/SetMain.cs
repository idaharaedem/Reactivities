using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }


        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _accessor;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IUserAccessor accessor)
            {
                _accessor = accessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _accessor.getUsername());

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if(photo == null) {

                    throw new RestException(HttpStatusCode.BadRequest, new {Photo = "notFound"});
                }

                var currentMain = _context.Photos.FirstOrDefault(x => x.isMain); 

                currentMain.isMain = false;

                
                photo.isMain = true;



                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }

    }
}