using System.Linq;
using System.Security.Claims;
using Application.interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
    //Used to get the user name from the token
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string getUsername()
        {
           var username = _httpContextAccessor.HttpContext.User?.Claims?
           .FirstOrDefault(x => x.Type ==  ClaimTypes.NameIdentifier)?.Value;

           return username;
        }
    }
}