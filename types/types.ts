import { ReactNode } from "react";
// ? もしかすると、 deprecated なものなのかも？
// The `querystring` API is considered Legacy. While it is still maintained, new code should use the `URLSearchParams` API instead.
import { ParsedUrlQuery } from "querystring";
import { BlockType } from "notion-block-renderer";

export type LayoutProps = {
  children: ReactNode;
};

// FIXME: PageProps というのと PageType というのが2つあるのは、ややこしいなぁ
export type PageProps = {
  slug: string;
  name: string;
  author: string;
  cover: string;
  published: string;
  tags: string[];
  content: string;
};

export type CardProps = {
  page: PageType;
};

export type ArticleProps = {
  page: PageType;
  blocks: BlockType[];
};

export type ArticleMetaProps = CardProps;

export type IndexProps = {
  pages: PageType[];
};

export type BlockProps = {
  block: BlockType;
};

export type Params = ParsedUrlQuery & {
  slug: string;
};

export type FileType = {
  file?: { url: string };
  external?: { url: string };
};

export type AnnotationType = {
  bold: boolean;
  code: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  color: string;
};

export type RichTextType = {
  plain_text: string;
  href: string | null;
  annotations: AnnotationType;
};

export type PropertyType = {
  name: { title: RichTextType[] };
  author: { rich_text: RichTextType[] };
  slug: { rich_text: RichTextType[] };
  published: { date: { start: string } };
  isPublic: { checkbox: boolean };
  tag: { multi_select: [{ name: string }] };
};

export type PageType = {
  id: string;
  cover: FileType | null;
  properties: PropertyType;
};

// export type BlockType = {
//   type: string;
//   heading_1: { rich_text: RichTextType[] };
//   heading_2: { rich_text: RichTextType[] };
//   paragraph: { rich_text: RichTextType[] };
// };
