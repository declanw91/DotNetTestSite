using System.Threading.Tasks;

namespace DotNetTestSite.Controllers
{
    public interface ILastFmApiController
    {
        Task<string> GetRecentTracks();
    }
}
