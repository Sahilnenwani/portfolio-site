import { NextResponse } from "next/server";

export async function GET() {
  try {
    const twitterUsername = "NenwaniSah7402";

    // Twitter API v2 requires authentication
    // For now, we'll use a fallback approach or you can set up Twitter API keys
    const bearerToken = process.env.TWITTER_BEARER_TOKEN;

    if (!bearerToken) {
      // Return a fallback response with a link to the profile
      return NextResponse.json({
        posts: [],
        profileUrl: `https://x.com/${twitterUsername}`,
        message:
          "Twitter API not configured. Please set TWITTER_BEARER_TOKEN in environment variables.",
      });
    }

    // Fetch user ID first
    const userResponse = await fetch(
      `https://api.twitter.com/2/users/by/username/${twitterUsername}?user.fields=profile_image_url,description`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );

    if (!userResponse.ok) {
      throw new Error("Failed to fetch Twitter user");
    }

    const userData = await userResponse.json();
    const userId = userData.data.id;

    // Fetch recent tweets
    const tweetsResponse = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at,public_metrics,text&exclude=replies,retweets`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );

    if (!tweetsResponse.ok) {
      throw new Error("Failed to fetch tweets");
    }

    const tweetsData = await tweetsResponse.json();

    // Transform tweets to our format
    interface TwitterTweet {
      id: string;
      text: string;
      created_at: string;
      public_metrics?: {
        like_count?: number;
        retweet_count?: number;
        reply_count?: number;
      };
    }

    const posts =
      tweetsData.data?.map((tweet: TwitterTweet) => {
        const metrics = tweet.public_metrics || {};

        return {
          id: tweet.id,
          text: tweet.text,
          url: `https://x.com/${twitterUsername}/status/${tweet.id}`,
          date: tweet.created_at,
          likes: metrics.like_count || 0,
          retweets: metrics.retweet_count || 0,
          replies: metrics.reply_count || 0,
        };
      }) || [];

    return NextResponse.json(
      {
        posts,
        profileUrl: `https://x.com/${twitterUsername}`,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching Twitter posts:", error);

    // Return fallback with profile link
    return NextResponse.json(
      {
        posts: [],
        profileUrl: `https://x.com/NenwaniSah7402`,
        error: "Failed to fetch Twitter posts",
      },
      { status: 500 }
    );
  }
}
