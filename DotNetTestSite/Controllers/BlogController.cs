using DotNetTestSite.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net.Http;

namespace DotNetTestSite.Controllers
{
    public class BlogController : Controller
    {
        public IActionResult Index()
        {
            List<BlogPost> blogPosts = GetBlogPosts();
            return View(blogPosts);
        }
        private List<BlogPost> GetBlogPosts()
        {
            List<BlogPost> blogPosts = new List<BlogPost>();

            using (var client = new HttpClient())
            {
                //HTTP GET
                client.BaseAddress = new Uri("https://localhost:44309/");
                var responseTask = client.GetAsync("blog/all");
                responseTask.Wait();

                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsStringAsync();
                    readTask.Wait();

                    var readTaskResult = readTask.Result;
                    blogPosts.AddRange(Newtonsoft.Json.JsonConvert.DeserializeObject<List<BlogPost>>(readTaskResult));
                }
            }

            return blogPosts;
        }
    }
}
