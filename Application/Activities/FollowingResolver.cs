using System.Linq;
using Application.interfaces;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Activities
{
    public class FollowingResolver : IValueResolver<UserActivity, AttendeeDTO, bool>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _accessor;
        public FollowingResolver(DataContext context, IUserAccessor accessor)
        {
            _accessor = accessor;
            _context = context;
        }

        public bool Resolve(UserActivity source, AttendeeDTO destination, bool destMember, ResolutionContext context)
        {
            var currentUser = _context.Users.SingleOrDefaultAsync(x => x.UserName == _accessor.getUsername()).Result;

            //checking if any of the follings match from the current user of nay of the Attendee
            if(currentUser.Following.Any(x => x.TargetId == source.AppUserId)){
                return true;
            }
            else {
                return false;
            }
            
        }
    }
}