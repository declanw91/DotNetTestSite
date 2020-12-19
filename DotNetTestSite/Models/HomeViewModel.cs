using System.Collections.Generic;

namespace DotNetTestSite.Models
{
    public class HomeViewModel
    {
        public List<TrackItem> RecentTracks { get; set; }
        public List<TrackItem> Tweets { get; set; }
    }
}
