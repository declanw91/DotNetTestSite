using System.Collections.Generic;

namespace DotNetTestSite.Models
{
    public class BlogViewModel
    {
        public List<BlogPost> BlogPosts { get; set; }

        public BlogViewModel()
        {
            BlogPosts = new List<BlogPost>();
        }
    }
}
