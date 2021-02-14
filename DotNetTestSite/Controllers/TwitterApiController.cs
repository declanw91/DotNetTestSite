using DotNetTestSite.Config;
using DotNetTestSite.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace DotNetTestSite.Controllers
{
    public class TwitterApiController : ITwitterApiController
	{
		public async Task<string> GetTweetsAsync(string accessToken = null)
		{
			var url = $"https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name={AppConfig.TwitterUsername}&count=50&tweet_mode=extended";
			var myTweets = new List<TweetItem>();
			if (accessToken == null)
			{
				accessToken = await GetAccessToken();
			}
			using (var client = new HttpClient())
            {
				var request = new HttpRequestMessage(HttpMethod.Get, url);
				request.Headers.Add("Authorization", "Bearer " + accessToken);
				HttpResponseMessage response = await client.SendAsync(request);
				if (response.StatusCode == HttpStatusCode.OK)
                {
					var tweets = response.Content.ReadAsStringAsync().Result;
					var tweetArray = JArray.Parse(tweets);
					foreach(var tweet in tweetArray)
                    {
						var text = tweet.SelectToken("full_text").ToString();
						var cleanText = Regex.Replace(text, @"http[^\s]+", "");
						var hashtag = Regex.Match(text, @"#[a-zA-Z]+");
						if(hashtag.Success)
                        {
							var hashtagLink = "<a href=\"https://twitter.com/hashtag/" + hashtag.Value.Replace("#","") + "\">" + hashtag.Value + "</a>";
							cleanText = cleanText.Replace(hashtag.Value, hashtagLink);
                        }
						var date = tweet.SelectToken("created_at").ToString();
						var tweetItem = new TweetItem { Text = cleanText, Published = date.Split("+")[0] };
						var extended = tweet.SelectToken("extended_entities");
						if (extended != null)
						{
							var media = extended.SelectToken("media").ToString();
							if(media != null)
                            {
								var mediaArray = JArray.Parse(media);
								tweetItem.Attachments = mediaArray.ToObject<List<object>>();
							}
						}
						myTweets.Add(tweetItem);
					}
				}
			}
			var resp = Newtonsoft.Json.JsonConvert.SerializeObject(myTweets);
			return resp;
		}
		private async Task<string> GetAccessToken()
		{
			var httpClient = new HttpClient();
			var request = new HttpRequestMessage(HttpMethod.Post, "https://api.twitter.com/oauth2/token ");
			var customerInfo = Convert.ToBase64String(new UTF8Encoding()
									  .GetBytes(AppConfig.TwitterConsumerKey + ":" + AppConfig.TwitterConsumerSecret));
			request.Headers.Add("Authorization", "Basic " + customerInfo);
			request.Content = new StringContent("grant_type=client_credentials",
													Encoding.UTF8, "application/x-www-form-urlencoded");

			HttpResponseMessage response = await httpClient.SendAsync(request);

			var json = await response.Content.ReadAsStringAsync();
			var obj = JObject.Parse(json);
			var token = obj.SelectToken("access_token").ToString();
			return token;
		}
	}
}
