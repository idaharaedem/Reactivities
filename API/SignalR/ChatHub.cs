using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Comment;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    // works as an API Controller
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(Create.Command command)
        {
            string username = GettingUsername();

            command.Username = username;

            var comment = await _mediator.Send(command);

            await Clients.All.SendAsync("CommentReceived", comment);
        }

        private string GettingUsername()
        {
            //getting it from hub context
            return Context.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
        }

        // public async Task AddGroup(string groupName) 
        // {
        //     await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

        //     var username = GettingUsername();

        //     await Clients.Group(groupName).SendAsync("Send", $"{username} has joined");
        // }

        // public async Task RemoveFromGroup(string groupName) 
        // {
        //     await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

        //     var username = GettingUsername();
            
        //     await Clients.Group(groupName).SendAsync("Send", $"{username} has left the group");
        // }
    }
}