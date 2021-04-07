using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Comment
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
             CreateMap<Comments, CommentDTO>()
             .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.Author.DisplayName))
            .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.Author.UserName))
            .ForMember(dest => dest.Photos, opt => opt.MapFrom(src => src.Author.Photos.FirstOrDefault(p => p.isMain).Url));
        }
    }
}