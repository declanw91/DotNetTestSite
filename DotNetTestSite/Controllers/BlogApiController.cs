﻿using DotNetTestSite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace DotNetTestSite.Controllers
{
    public class BlogApiController : IBlogApiController
    {
        public async Task<string> GetAllBlogPosts()
        {
            var url = "https://www.blogger.com/feeds/4886411145150219450/posts/default";
            List<BlogPost> blogPosts = new List<BlogPost>();
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = client.GetAsync(url).Result;

                if (response.StatusCode == HttpStatusCode.OK)
                {
                    XDocument xdoc = XDocument.Parse(response.Content.ReadAsStringAsync().Result);
                    var posts = xdoc.Descendants();
                    var test = posts.Where(n => n.Name.ToString().Contains("entry"));
                    foreach (XElement n in test)
                    {
                        var children = n.Elements();
                        if(children != null)
                        {
                            var title = children.FirstOrDefault(n => n.Name.ToString().Contains("title")).Value;
                            var content = children.FirstOrDefault(n => n.Name.ToString().Contains("content")).Value;
                            var published = children.FirstOrDefault(n => n.Name.ToString().Contains("published")).Value;
                            blogPosts.Add(new BlogPost { Title = title, Content = content, Published = DateTime.Parse(published) });
                        }
                    }
                }

            }
            var resp = Newtonsoft.Json.JsonConvert.SerializeObject(blogPosts);
            return resp;
        }
    }
}
