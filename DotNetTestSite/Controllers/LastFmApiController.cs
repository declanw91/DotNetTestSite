using DotNetTestSite.Config;
using DotNetTestSite.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Xml.Linq;

namespace DotNetTestSite.Controllers
{
    [ApiController]
    public class LastFmApiController : ControllerBase
    {
        [HttpGet("tracks/recent")]
        public ActionResult<string> GetRecentTracks()
        {
            var url = $"http://ws.audioscrobbler.com/2.0/?user=dec147&api_key={AppConfig.LastFmKey}&limit=20&method=user.getrecenttracks";
            List<TrackItem> recentTracks = new List<TrackItem>();
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/xml"));
                HttpResponseMessage response = client.GetAsync(url).Result;

                if (response.StatusCode == HttpStatusCode.OK)
                {
                    XDocument xdoc = XDocument.Parse(response.Content.ReadAsStringAsync().Result);
                    var posts = xdoc.Descendants();
                    var tracks = posts.Where(n => n.Name.ToString().Contains("track"));
                    var name = string.Empty;
                    var artist = string.Empty;
                    var album = string.Empty;
                    var image = string.Empty;
                    foreach (XElement n in tracks)
                    {
                        var children = n.Elements();
                        if (children != null)
                        {
                            var nameNode = n.Elements().FirstOrDefault(n => n.Name.ToString().Contains("name"));
                            if(nameNode != null)
                            {
                                name = nameNode.Value;
                            }
                            var artistNode = n.Elements().FirstOrDefault(n => n.Name.ToString().Contains("artist"));
                            if(artistNode != null)
                            {
                                artist = artistNode.Value;
                            }
                            var albumNode = n.Elements().FirstOrDefault(n => n.Name.ToString().Contains("album"));
                            if(albumNode != null)
                            {
                                album = albumNode.Value;
                            }
                            var imageNode = n.Elements().FirstOrDefault(n => n.Name.ToString().Contains("image"));
                            if(imageNode != null)
                            {
                                image = imageNode.Value;
                            }
                            
                            recentTracks.Add(new TrackItem { Name = name, Artist = artist, Album = album, Image = image }) ;
                        }
                    }
                }

            }
            var resp = Newtonsoft.Json.JsonConvert.SerializeObject(recentTracks);
            return Ok(resp);
        }
        [HttpGet("tracks/topalbums")]
        public ActionResult<string> GetTopAlbums()
        {
            var url = $"http://ws.audioscrobbler.com/2.0/?user=dec147&api_key={AppConfig.LastFmKey}&limit=20&method=user.gettopalbums";
            List<TrackItem> recentTracks = new List<TrackItem>();
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/xml"));
                HttpResponseMessage response = client.GetAsync(url).Result;

                if (response.StatusCode == HttpStatusCode.OK)
                {
                    XDocument xdoc = XDocument.Parse(response.Content.ReadAsStringAsync().Result);
                    var posts = xdoc.Descendants();
                    var tracks = posts.Where(n => n.Name.ToString().Contains("album"));
                    var name = string.Empty;
                    var artist = string.Empty;
                    var album = string.Empty;
                    var image = string.Empty;
                    var playCount = string.Empty;
                    foreach (XElement n in tracks)
                    {
                        var children = n.Elements();
                        if (children != null)
                        {
                            var nameNode = n.Elements().FirstOrDefault(n => n.Name.ToString().Contains("name"));
                            if (nameNode != null)
                            {
                                name = nameNode.Value;
                            }
                            var artistNode = n.Elements().FirstOrDefault(n => n.Name.ToString().Contains("artist"));
                            if (artistNode != null)
                            {
                                artist = artistNode.Elements().FirstOrDefault(n => n.Name.ToString().Contains("name")).Value;
                            }
                            var imageNode = n.Elements().FirstOrDefault(n => n.Name.ToString().Contains("image"));
                            if (imageNode != null)
                            {
                                image = imageNode.Value;
                            }
                            var playCountNode = n.Elements().FirstOrDefault(n => n.Name.ToString().Contains("playcount"));
                            if (playCountNode != null)
                            {
                                playCount = playCountNode.Value;
                            }
                            if(!string.IsNullOrWhiteSpace(name))
                            {
                                recentTracks.Add(new TrackItem { Name = name, Artist = artist, Album = album, Image = image, PlayCount = playCount });
                            }
                        }
                    }
                }

            }
            var resp = Newtonsoft.Json.JsonConvert.SerializeObject(recentTracks);
            return Ok(resp);
        }
    }
}
