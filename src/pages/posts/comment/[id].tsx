import React from 'react';
import Layout from '@/components/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Comment(): JSX.Element {
  const router = useRouter();
  // /post/<id>/<comment>/[...more sub paths ...]?foo=abc
  const { id, foo } = router.query;

  return (
    <Layout>
      <Head>
        <title>some comment</title>
      </Head>
      <article>{`Just any comment with id ${id} and query parameter foo = ${foo}`}</article>
    </Layout>
  );
}
