using DotNetTestSite.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net.Http;

namespace DotNetTestSite.Controllers
{
    public class TwitterController : Controller
    {
        public IActionResult Index()
        {
            var tweets = GetRecentTweets();
            return View(tweets);
        }
        private List<TweetItem> GetRecentTweets()
        {
            List<TweetItem> recentTweets = new List<TweetItem>();
            using (var client = new HttpClient())
            {
                //HTTP GET
                client.BaseAddress = new Uri("https://localhost:44309/");
                var responseTask = client.GetAsync("tweets/recent");
                responseTask.Wait();

                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsStringAsync();
                    readTask.Wait();

                    var readTaskResult = readTask.Result;
                    recentTweets.AddRange(Newtonsoft.Json.JsonConvert.DeserializeObject<List<TweetItem>>(readTaskResult));
                }
            }
            return recentTweets;
        }
    }
}
