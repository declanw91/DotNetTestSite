using System.Threading.Tasks;

namespace DotNetTestSite.Controllers
{
    public interface ITwitterApiController
    {
        Task<string> GetTweetsAsync(string accessToken = null);
    }
}
