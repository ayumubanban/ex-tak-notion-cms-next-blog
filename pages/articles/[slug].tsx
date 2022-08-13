import Image from "next/image";
import React from "react";
import { GetStaticProps, NextPage } from "next";

import Layout from "../../components/Layout";
import ArticleMeta from "../../components/ArticleMeta";
import { ArticleProps, Params } from "../../types/types";
import { sampleCards } from "../../utils/sample";

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params; // [slug].tsx

  const page = sampleCards.find((data) => data.slug === slug);

  return {
    props: {
      page,
    },
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
