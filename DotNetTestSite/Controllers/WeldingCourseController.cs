using Microsoft.AspNetCore.Mvc;

namespace DotNetTestSite.Controllers
{
    public class WeldingCourseController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
