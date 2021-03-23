using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Photos
{
    public class Adding
    {
        //We'll have to send back a photo so thats why we initialise parameters for a command handler
        public class Command : IRequest<Photo>
        {
            public IFormFile File { get; set; }
        }


        public class Handler : IRequestHandler<Command, Photo>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _accessor;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IUserAccessor accessor, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _accessor = accessor;
                _context = context;
            }

            public async Task<Photo> Handle(Command request, CancellationToken cancellationToken)
            {

                var photoUploadRes = _photoAccessor.AddPhoto(request.File);

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _accessor.getUsername());

               

                var photo = new Photo 
                {
                    Url = photoUploadRes.Url,
                    Id = photoUploadRes.PublicId
                };

                if(!user.Photos.Any(x => x.isMain)) {

                    photo.isMain = true;
                }

                 user.Photos.Add(photo); 

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return photo;

                throw new Exception("Problem saving changes");
            }
        }
    }
}