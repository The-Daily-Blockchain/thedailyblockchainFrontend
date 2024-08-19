import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

export async function GET() {
  const links = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/about", changefreq: "monthly", priority: 0.5 },
    { url: "/topnews", changefreq: "daily", priority: 1.0 },
    { url: "/crypto101", changefreq: "weekly", priority: 0.8 },
    { url: "/liveprices", changefreq: "daily", priority: 1.0 },
    { url: "/contactus", changefreq: "monthly", priority: 0.5 },
  ];

  const stream = new SitemapStream({
    hostname: process.env.NEXT_PUBLIC_BASE_URL,
  });

  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data) => data.toString());

  return new Response(xmlString, {
    headers: { "Content-Type": "application/xml" },
  });
}
