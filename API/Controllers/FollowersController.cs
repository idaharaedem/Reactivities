
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Followers;
using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/profiles")]
    public class FollowersController : ControllerBase
    {
        private readonly IMediator _mediator;
        public FollowersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("{username}/follow")]
        public async Task<ActionResult<Unit>> Follow(string username)
        {
            return await _mediator.Send(new Add.Command{Username = username});
        }

        [HttpDelete("{username}/follow")]

        public async Task<ActionResult<Unit>> UnFollow(string username) 
        {

            return await _mediator.Send(new Delete.Command{Username = username});
        }

        [HttpGet("{username}/follow")]
        public async Task<ActionResult<List<Profile>>> GetFollowings(string username, string listReturn) 
        {
           return await _mediator.Send(new ListOfFollowers.Query {Username = username, ListReturn = listReturn});
        }
    }
}