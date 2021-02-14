using System.Threading.Tasks;

namespace DotNetTestSite.Controllers
{
    public interface IBlogApiController
    {
        Task<string> GetAllBlogPosts();
    }
}
