import Link from 'next/link';
import Head from 'next/head';
import Layout from '@/components/layout';
import React, { useState } from 'react';
import Alert from '@/components/alert';

export default function RandomPage(): JSX.Element {
  const [alertDisplayed, setAlertDisplayed] = useState(false);

  return (
    <Layout>
      <Head>
        <title>random page</title>
      </Head>
      <h1>this is a random page</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      {/* Note: this role removes the element from the accessibility tree
      so it will be interpreted by screen readers as pure text */}
      {/* @ts-ignore */}
      <a role="presentation" onClick={() => setAlertDisplayed(true)}>
        Click me!
      </a>
      {alertDisplayed && (
        <Alert type="success">
          <div>Alert content</div>
        </Alert>
      )}
    </Layout>
  );
}
