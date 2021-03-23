using System.Threading.Tasks;
using Application.Photos;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController
    {
        private readonly IMediator _mediatR;
        public PhotosController(IMediator mediatR)
        {
            _mediatR = mediatR;

        }

        [HttpPost]
        public async Task<ActionResult<Photo>> AddPhoto([FromForm] Adding.Command command)
        {
           return await _mediatR.Send(command);
        }

        
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeletePhoto (string id)
        {
            return await _mediatR.Send(new Deleting.Command{Id = id});
        }

        [HttpPost("{id}/setmain")]
        public async Task <ActionResult<Unit>> SetMain(string id) 
        {
            return await _mediatR.Send(new SetMain.Command{Id = id});
        }
        

    }
}