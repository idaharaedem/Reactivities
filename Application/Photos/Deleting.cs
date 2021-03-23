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
    public class Deleting
    {
        public class Command : IRequest
        {
            //The Id of the string that youre going to delete
            public string Id { get; set; }
        }


        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.getUsername());

                var specificPhoto = user.Photos.FirstOrDefault(x=> x.Id == request.Id);

   
                if(specificPhoto == null) {
                    throw new RestException(HttpStatusCode.NotFound, new {Photo = "Image was not found"});
                }

                // if(specificPhoto.isMain == true) {
                //     throw new RestException(HttpStatusCode.BadRequest, new {Photo = "Cannot delete main photo"});
                // }


                _photoAccessor.DeletPhoto(specificPhoto.Id);

                //remember to also remove it from the database
                user.Photos.Remove(specificPhoto);

            
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }

    }
}