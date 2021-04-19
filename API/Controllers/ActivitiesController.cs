
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Application.Profiles;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        //optional paramaters being passed and if nothing is passed the default values are set
        public async Task<ActionResult<List.ActivitiesEnvelope>> ActivityList([FromQuery]int? limit, int? offset, bool isGoing, bool isHost, DateTime? startDate) 
        {
            return await _mediator.Send(new List.Query(limit, offset, isGoing, isHost, startDate));
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<ActivitityDTO>> GetActivity(Guid id) 
        {
            return await _mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command) 
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command) 
        {   
            command.Id = id; 
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task <ActionResult<Unit>> DeleteActivity (Guid id) 
        {   
            return await _mediator.Send(new Delete.Command{Id = id});
        }

        [HttpPost("{id}/attend")]
        public async Task<ActionResult<Unit>> Attend (Guid id) 
        {
            return await _mediator.Send(new Attend.Command{Id = id});
        }

        [HttpDelete("{id}/attend")]
        public async Task<ActionResult<Unit>> UnAttend (Guid id) 
        {
            return await _mediator.Send(new UnAttend.Command{Id = id});
        }

      
    }
}