using System.Collections.Generic;

namespace DotNetTestSite.Models
{
    public class HomeViewModel
    {
        public List<TrackItem> RecentTracks { get; set; }
        public List<TweetItem> Tweets { get; set; }

        public HomeViewModel()
        {
            RecentTracks = new List<TrackItem>();
            Tweets = new List<TweetItem>();
        }
    }
}
