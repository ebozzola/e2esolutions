import React from "react";
import { notFound, redirect } from "next/navigation";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "./client-page";

export const revalidate = 600;

export default async function Page({
  params,
}: {
  params: Promise<{ filename: string[] }>;
}) {
  const { filename } = await params;

  // Redirect /admin to the TinaCMS admin panel
  if (filename[0] === "admin") {
    redirect("/admin/index.html");
  }

  try {
    const data = await client.queries.page({
      relativePath: `${filename.join("/")}.mdx`,
    });

    return (
      <Layout rawPageData={data}>
        <ClientPage {...data} />
      </Layout>
    );
  } catch (error) {
    // If the page doesn't exist, show 404
    notFound();
  }
}

export async function generateStaticParams() {
  let pages = await client.queries.pageConnection();
  const allPages = pages;

  while (pages.data.pageConnection.pageInfo.hasNextPage) {
    pages = await client.queries.pageConnection({
      after: pages.data.pageConnection.pageInfo.endCursor,
    });
    allPages.data.pageConnection.edges?.push(...(pages.data.pageConnection.edges || []));
  }

  const params =
    allPages.data?.pageConnection.edges?.map((edge) => ({
      filename: edge?.node?._sys.breadcrumbs,
    })) || [];

  // exclude the home page
  return params.filter((p) => !p.filename?.every((x) => x === "home"));
}
