using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace DotNetTestSite.Models
{
    public class TweetItem
    {
        public string Text { get; set; }
        public string Published { get; set; }
        public List<object> Attachments { get; set; }
    }
}
