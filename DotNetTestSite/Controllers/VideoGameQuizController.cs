using Microsoft.AspNetCore.Mvc;

namespace DotNetTestSite.Controllers
{
    public class VideoGameQuizController : Controller
    {
        public IActionResult Index()
        {
            return PartialView();
        }
    }
}
