using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Profiles
{
    public class Detailss
    {
        public class Query : IRequest<Profile>
        {
            public string Username { get; set; }
        }


        public class Handler : IRequestHandler<Query, Profile>
        {
            // dont need the datatcontext and useraccessor anymore since were using IProfileReader
            private readonly IProfileReader _profileReader;
            public Handler(IProfileReader profileReader)
            {
                _profileReader = profileReader;

            }

            public async Task<Profile> Handle(Query requests, CancellationToken cancellationToken)
            {
                return await _profileReader.ReadProfile(requests.Username);
            }
        }
    }
}