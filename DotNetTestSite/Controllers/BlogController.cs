using DotNetTestSite.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DotNetTestSite.Controllers
{
    public class BlogController : Controller
    {
        private readonly IBlogApiController _blogController;

        public BlogController(IBlogApiController blogController)
        {
            _blogController = blogController;
        }

        public async System.Threading.Tasks.Task<IActionResult> IndexAsync()
        {
            var model = new BlogViewModel();
            List<BlogPost> blogPosts = await GetBlogPosts();
            model.BlogPosts.AddRange(blogPosts);
            return View(model);
        }

        private async Task<List<BlogPost>> GetBlogPosts()
        {
            List<BlogPost> blogPosts = new List<BlogPost>();
            var blogs = await _blogController.GetAllBlogPosts();
            blogPosts.AddRange(Newtonsoft.Json.JsonConvert.DeserializeObject<List<BlogPost>>(blogs));
            return blogPosts;
        }
    }
}
