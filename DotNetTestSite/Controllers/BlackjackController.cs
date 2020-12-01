using Microsoft.AspNetCore.Mvc;

namespace DotNetTestSite.Controllers
{
    public class BlackjackController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
