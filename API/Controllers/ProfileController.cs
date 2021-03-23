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
            return await _mediator.Send(new Details.Query{Username = username});
        }
    }
}