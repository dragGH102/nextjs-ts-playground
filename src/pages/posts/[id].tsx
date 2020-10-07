import React from 'react';
import { getAllPostIds, getPostData } from '@/lib/posts';
import { PostData } from '@/lib/shared-types';
import Layout from '@/components/Layout';
import Date from '@/components/Date';
import Head from 'next/head';
import utilStyles from '../../../styles/utils.module.css';

export default function Post({ postData }: PostData): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

// this is used to define which dynamic paths (e.g. with [id] parameter]
// (they will be pre-rendered or server-side rendered depending on what we return)
// docs: https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export async function getStaticPaths(): Promise<any> {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false, //
  };
}

export async function getStaticProps({
  params,
}: PostData): Promise<{ props: any }> {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}
