using Domain;

namespace Application.interfaces
{
    public interface IJwttGenerator
    {
         string createToken(AppUser user);
    }
}