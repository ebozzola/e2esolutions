const fs = require("fs");
const path = require("path");
const { createClient } = require("tinacms/dist/client");

// Load environment variables
require("dotenv").config();

// Base URL from environment variable
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://e2esolutions.com.au/";

// Create Tina client
const client = createClient({
  url: "http://localhost:4001/graphql",
  token: process.env.TINA_TOKEN,
});

async function generateSitemap() {
  try {
    console.log("Generating sitemap.xml...");

    // Start XML content
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

    // Fetch posts from Tina CMS
    try {
      const postsResponse = await client.request({
        query: `query {
          postConnection {
            edges {
              node {
                _sys {
                  filename
                }
              }
            }
          }
        }`,
      });

      const posts = postsResponse.data.postConnection.edges || [];

      for (const post of posts) {
        sitemap += `
  <url>
    <loc>${baseUrl}posts/${post.node._sys.filename}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      }
    } catch (error) {
      console.error("Error fetching posts for sitemap:", error);
    }

    // Fetch pages from Tina CMS
    try {
      const pagesResponse = await client.request({
        query: `query {
          pageConnection {
            edges {
              node {
                _sys {
                  filename
                }
              }
            }
          }
        }`,
      });

      const pages = pagesResponse.data.pageConnection.edges || [];

      for (const page of pages) {
        // Skip the index page as it's already included
        if (page.node._sys.filename === "index") continue;

        sitemap += `
  <url>
    <loc>${baseUrl}${page.node._sys.filename}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
      }
    } catch (error) {
      console.error("Error fetching pages for sitemap:", error);
    }

    // Close XML
    sitemap += `
</urlset>`;

    // Ensure the public directory exists
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write sitemap to public directory
    fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
    console.log("Sitemap generated successfully!");
  } catch (error) {
    console.error("Error generating sitemap:", error);
    process.exit(1);
  }
}

generateSitemap();
