using Microsoft.AspNetCore.Mvc;

namespace DotNetTestSite.Controllers
{
    public class AngularMovieSearchController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult MovieResults()
        {
            return PartialView();
        }
    }
}
