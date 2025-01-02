import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import showdown from "showdown";

let converter = new showdown.Converter();

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: `Blog - George's Website`,
    description: "George's blog. I'll occasionally post on here if I want to.",
    site: context.site,
    items: await Promise.all(
      posts.map(async (post) => ({
        ...post.data,
        link: `/blog/${post.slug}/`,
        content: converter.makeHtml(post.body),
        pubDate: post.data.pubDate,
      }))
    ),
  });
}
