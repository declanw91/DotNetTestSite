using Microsoft.AspNetCore.Mvc;

namespace DotNetTestSite.Controllers
{
    public class BreakoutGameController : Controller
    {
        public IActionResult Index()
        {
            return PartialView();
        }
    }
}
