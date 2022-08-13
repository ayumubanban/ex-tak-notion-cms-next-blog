import Image from "next/image";
import React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import Layout from "../../components/Layout";
import ArticleMeta from "../../components/ArticleMeta";
import { ArticleProps, Params } from "../../types/types";
import { fetchBlocksByPageId, fetchPages } from "../../utils/notion";
import { getText } from "../../utils/property";

// まだあんまりよくわかってないけど、 dynamic に URL path が決定されるページについては、 getStaticProps に加えて getStaticPaths が必要になってくるらしい。まぁ、 getStaticPaths が無いと https://github.com/ayumubanban/ex-tak-notion-cms-next-blog/pull/22#issue-1337930442 で示されてるようなエラーが表示されるしなぁ
export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await fetchPages({});
  // ? any 使う以外に、もうちょい上手いやり方ないかな？
  const paths = results.map((page: any) => {
    return {
      params: {
        slug: getText(page.properties.slug.rich_text),
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params; // [slug].tsx

  const { results } = await fetchPages({ slug }); // 例えば slug が同じ記事が複数あった場合、2件以上の記事のデータが返ってくることもありうる。まぁ何にせよ、この返り値の型は配列となる
  const page = results[0];
  const pageId = page.id;
  const { results: blocks } = await fetchBlocksByPageId(pageId);

  return {
    props: {
      page,
      blocks,
    },
    revalidate: 10, // ISR
  };
};

const Article: NextPage<ArticleProps> = ({ page }) => {
  return (
    <Layout>
      <article className="w-full">
        {/* meta section */}
        <div className="my-12">
          <ArticleMeta page={page} />
        </div>

        {/* article */}
        <div className="my-12">article {page.content}</div>
      </article>
    </Layout>
  );
};

export default Article;
