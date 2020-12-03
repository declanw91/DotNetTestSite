using Microsoft.AspNetCore.Mvc;

namespace DotNetTestSite.Controllers
{
    public class VueWineStoreController : Controller
    {
        public IActionResult Index()
        {
            return PartialView();
        }
    }
}
