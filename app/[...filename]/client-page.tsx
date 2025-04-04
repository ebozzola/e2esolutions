"use client";
import { useTina } from "tinacms/dist/react";
import { Blocks } from "@/components/blocks";
import { PageQuery } from "@/tina/__generated__/types";

export interface ClientPageProps {
  data: {
    page: PageQuery["page"];
  };
  variables: {
    relativePath: string;
  };
  query: string;
}

export const revalidate = 600;
export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina({...props});
  return <Blocks {...data?.page} />;
}
