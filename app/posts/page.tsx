import Layout from "@/components/layout/layout";
import client from "@/tina/__generated__/client";
import PostsClientPage from "./client-page";

export default async function PostsPage() {
  try {
    // Fetch all posts and filter out drafts in JavaScript
    let posts = await client.queries.postConnection({
      sort: "date",
    });
    const allPosts = posts;

    while (posts.data?.postConnection.pageInfo.hasNextPage) {
      posts = await client.queries.postConnection({
        sort: "date",
        after: posts.data.postConnection.pageInfo.endCursor,
      });
      allPosts.data.postConnection.edges?.push(
        ...(posts.data.postConnection.edges || [])
      );
    }

    allPosts.data.postConnection.edges?.reverse();

    return (
      <Layout rawPageData={allPosts.data}>
        <PostsClientPage {...allPosts} />
      </Layout>
    );
  } catch (error) {
    console.error("Error fetching posts index:", error);
    return <div>Error loading posts</div>;
  }
}
