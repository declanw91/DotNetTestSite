using DotNetTestSite.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DotNetTestSite.Controllers
{
    public class TwitterController : Controller
    {
        public async Task<IActionResult> IndexAsync()
        {
            var tweets = await GetRecentTweets();
            return View(tweets);
        }
        private async Task<List<TweetItem>> GetRecentTweets()
        {
            List<TweetItem> recentTweets = new List<TweetItem>();
            var tweetController = new TwitterApiController();
            var tweets = await tweetController.GetTweetsAsync();
            recentTweets.AddRange(Newtonsoft.Json.JsonConvert.DeserializeObject<List<TweetItem>>(tweets));
            return recentTweets;
        }
    }
}
