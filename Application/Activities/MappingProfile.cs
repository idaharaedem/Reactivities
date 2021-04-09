using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //From Object //ToObject
            CreateMap<Activity, ActivitityDTO>();
            CreateMap<UserActivity, AttendeeDTO>()
            .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.AppUser.UserName))
            .ForMember(dest => dest.Displayname, opt => opt.MapFrom(src => src.AppUser.DisplayName))
            .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.AppUser.Photos.FirstOrDefault(x => x.isMain).Url))
            .ForMember(dest => dest.Following, o => o.MapFrom<FollowingResolver>());

        }
    }
}