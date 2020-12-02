using Microsoft.AspNetCore.Mvc;

namespace DotNetTestSite.Controllers
{
    public class PictureCarouselController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
