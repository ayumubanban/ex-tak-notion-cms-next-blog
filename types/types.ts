import { ReactNode } from "react";
// ? もしかすると、 deprecated なものなのかも？
// The `querystring` API is considered Legacy. While it is still maintained, new code should use the `URLSearchParams` API instead.
import { ParsedUrlQuery } from "querystring";

export type LayoutProps = {
  children: ReactNode;
};

export type CardProps = {
  page: {
    slug: string;
    name: string;
    author: string;
    cover: string;
    published: string;
    tags: string[];
    content: string;
  };
};

export type Params = ParsedUrlQuery & {
  slug: string;
};
