using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController
    {
        private readonly IMediator _mediator;
        public ProfileController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<Profile>> GetProfile(string username)
        {
            return await _mediator.Send(new Detailss.Query{Username = username});
        }

        [HttpPut]
        public async Task<ActionResult<Unit>> UpdateProfileDetails(Bio.Command command) 
        {
            //command.Username = username;
            return await _mediator.Send(command);
        }

          [HttpGet("{username}/activities")]
        public async Task<ActionResult<List<UserActivityDTO>>> GetUsersActivities (string username, string predicate) 
        {
            return await _mediator.Send(new ListActivities.Query{Username = username, Predicate = predicate});  
        }

    }
}