using DotNetTestSite.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace DotNetTestSite.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ITwitterApiController _twitterController;
        private readonly ILastFmApiController _trackController;

        public HomeController(ILogger<HomeController> logger, ITwitterApiController tweetController, ILastFmApiController trackController)
        {
            _logger = logger;
            _twitterController = tweetController;
            _trackController = trackController;
        }

        public async Task<IActionResult> IndexAsync()
        {
            var model = new HomeViewModel();
            var tracks = await GetRecentTracks();
            var tweets = await GetRecentTweets();
            model.RecentTracks.AddRange(tracks.Take(5));
            model.Tweets.AddRange(tweets.Take(5));
            return View(model);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        private async Task<List<TrackItem>> GetRecentTracks()
        {
            List<TrackItem> recentTracks = new List<TrackItem>();
            var tracks = await _trackController.GetRecentTracks();
            recentTracks.AddRange(Newtonsoft.Json.JsonConvert.DeserializeObject<List<TrackItem>>(tracks));
            return recentTracks;
        }

        private async Task<List<TweetItem>> GetRecentTweets()
        {
            List<TweetItem> recentTweets = new List<TweetItem>();
            var tweets = await _twitterController.GetTweetsAsync();
            recentTweets.AddRange(Newtonsoft.Json.JsonConvert.DeserializeObject<List<TweetItem>>(tweets));
            return recentTweets;
        }
    }
}
