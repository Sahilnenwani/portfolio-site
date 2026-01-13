import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser();

export async function GET() {
  try {
    const mediumUsername = "SahilNenwani";
    const feedUrl = `https://medium.com/feed/@${mediumUsername}`;

    const feed = await parser.parseURL(feedUrl);

    // Transform Medium articles to our format
    const articles = feed.items.slice(0, 5).map((item) => {
      // Extract image from content if available
      const imageMatch = item.contentSnippet?.match(/<img[^>]+src="([^"]+)"/);
      const image = imageMatch ? imageMatch[1] : null;

      // Extract tags from categories
      const tags = item.categories || [];

      // Calculate read time (Medium typically provides this in content)
      const readTime = item.contentSnippet
        ? `${Math.ceil(item.contentSnippet.split(" ").length / 200)} min read`
        : "5 min read";

      return {
        title: item.title || "Untitled",
        excerpt:
          item.contentSnippet?.substring(0, 200) + "..." ||
          item.description?.substring(0, 200) + "..." ||
          "No description available",
        url: item.link || "",
        date: item.pubDate || new Date().toISOString(),
        readTime,
        tags: tags.slice(0, 3), // Limit to 3 tags
        image,
        author: item.creator || mediumUsername,
      };
    });

    return NextResponse.json(
      { articles },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching Medium articles:", error);
    return NextResponse.json(
      { articles: [], error: "Failed to fetch Medium articles" },
      { status: 500 }
    );
  }
}
