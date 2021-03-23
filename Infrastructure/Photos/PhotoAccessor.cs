using Application.interfaces;
using Application.Photos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos
{
    //Speaking to cloudinary
    public class PhotoAccessor : IPhotoAccessor
    {
        private readonly Cloudinary _cloudinary;

        //Allows us to get the settings within our user secrets
        public PhotoAccessor(IOptions<CloudinarySettings> config)
        {
            var account = new Account(
                config.Value.CloudName,
                config.Value.APIKey,
                config.Value.APISecret
            );

            _cloudinary = new Cloudinary(account);
        }
        public PhotoUploadResult AddPhoto(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();

            if(file.Length > 0) 
            {
                using (var stream = file.OpenReadStream()) 
                {
                    //what we're passing up to cloudinary
                    var uploadParams = new ImageUploadParams {

                        File = new FileDescription(file.FileName, stream),
                        Transformation = new Transformation().Height(400).Width(400)
                        .Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
    
            }

            if(uploadResult.Error != null) {

                throw new System.Exception(uploadResult.Error.Message);
            }

            return new PhotoUploadResult 
            {
                PublicId = uploadResult.PublicId,
                Url = uploadResult.SecureUrl.AbsoluteUri,
            };
        }

        public string DeletPhoto(string idPhoto)
        {
            var deleteParams = new DeletionParams(idPhoto);

            var result = _cloudinary.Destroy(deleteParams);

            //Will return an ok result if successfull
            return result.Result == "ok" ? result.Result : null;

             throw new System.Exception("sdas");
        }
    }
}