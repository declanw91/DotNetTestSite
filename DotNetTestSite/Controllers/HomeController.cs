using DotNetTestSite.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;

namespace DotNetTestSite.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            var model = new HomeViewModel();
            model.RecentTracks.AddRange(GetRecentTracks());
            return View(model);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        private List<TrackItem> GetRecentTracks()
        {
            List<TrackItem> recentTracks = new List<TrackItem>();
            using (var client = new HttpClient())
            {
                //HTTP GET
                client.BaseAddress = new Uri("https://localhost:44309/");
                var responseTask = client.GetAsync("tracks/recent");
                responseTask.Wait();

                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsStringAsync();
                    readTask.Wait();

                    var readTaskResult = readTask.Result;
                    recentTracks.AddRange(Newtonsoft.Json.JsonConvert.DeserializeObject<List<TrackItem>>(readTaskResult));
                }
            }
            return recentTracks;
        }
    }
}
