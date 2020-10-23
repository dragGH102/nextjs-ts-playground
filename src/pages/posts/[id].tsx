import React, { useEffect, useState } from 'react';
import { getAllPostIds, getPostData } from '@/lib/posts';
import { PostData } from '@/lib/shared-types';
import Layout from '@/components/layout';
import Date from '@/components/date';
import Head from 'next/head';
import { useRouter } from 'next/router';
import utilStyles from '../../../styles/utils.module.css';

export default function Post({ postData }: PostData): JSX.Element {
  const router = useRouter();

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter(parseInt(router.query.counter as string, 10));
  }, [router.query.counter]); // only re-run if this prop changes

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
        <p>
          <span
            role="presentation"
            onClick={() => {
              router.push(`/posts/${router.query.id}?counter=123`, undefined, {
                shallow: true,
              });
            }}
          >
            Update counter
          </span>
          !
        </p>
        <div>counter: {counter} </div>
      </article>

      <style jsx>{`
        p span {
          cursor: pointer;
        }
      `}</style>
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
