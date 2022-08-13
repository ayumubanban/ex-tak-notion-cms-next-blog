import Image from "next/image";
import React from "react";
import { GetStaticProps, NextPage } from "next";

import Layout from "../../components/Layout";
import ArticleMeta from "../../components/ArticleMeta";
import { ArticleProps, Params } from "../../types/types";
import { fetchBlocksByPageId, fetchPages } from "../../utils/notion";

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
