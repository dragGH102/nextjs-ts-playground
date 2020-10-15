import React from 'react';
import Layout from '@/components/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function CatchAllPage(): JSX.Element {
  const router = useRouter();
  // /post/<id>/<comment>/[...more sub paths ...]?foo=abc
  const { foo } = router.query;

  console.log(router.query);

  const slug = router.query.catchallroute || [];

  return (
    <Layout>
      <Head>
        <title>a catch all route</title>
      </Head>
      <h1>
        {/* @ts-ignore */}
        Slug: {(slug as string[])?.join('/')} - slug[0] : {slug[0]}
      </h1>
      <article>{`query param: ${foo}`}</article>
    </Layout>
  );
}
