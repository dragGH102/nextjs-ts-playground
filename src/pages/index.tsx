import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Title from '@/components/Title';
import Layout from '@/components/Layout';
import Date from '@/components/Date';
import { getSortedPostsData } from '@/lib/posts';
import utilStyles from '../../styles/utils.module.css';

// we can use this to fetch props based on dynamic data
// e.g. calling fetch() after the page was rendered
/* export async function getServerSideProps(): Promise<{ message: string }> {
  // console.log('getServerSideProps...');
  // ...
  return { message: 'whatever' };
} */

export async function getStaticProps(): Promise<{ props: any }> {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

// @ts-ignore
const Home: React.FC = ({ allPostsData }) => (
  <Layout>
    <div className="container">
      <Head>
        <title>This is the main page!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Title />

        <div className="grid">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Hey</h3>
            <p>
              Read
              <Link href="/random-page">
                <a>a random page!</a>
              </Link>
            </p>
          </a>
          <a className="card">
            <p>
              {/* TODO fix this (probably must defined nested page file) */}
              [dynamic route example]
              <Link href="/posts/comment/a-comment?foo=abc">
                <a>Go to comment [id].js with ?foo=abc</a>
              </Link>
            </p>
          </a>
          <a className="card">
            <p>
              [catchallroute example]
              <Link
                href="/posts/[...catchallroute]?foo=xyz"
                as="/posts/2020/second-post/with/catch/all/routes"
              >
                <a>Click here to try it!</a>
              </Link>
            </p>
          </a>
          {/* <a className="card">
            <p>
              [optional catchall] The main difference between catch all and
              optional catch all routes is that with optional, the route without
              the parameter is also matched
               Note: double square brackets (EXPERIMENTAL FEATURE)
              <Link
                href="/posts/comment/[[...optionalcatchallroute]]?foo=xyz"
                as="/posts/2020/second-post/with/optional/catch/all/routes"
              >
                <a>Click here to try it!</a>
              </Link>
            </p>
          </a> */}

          {/* more <a> blocks can go here */}
        </div>
      </main>

      <footer>
        <a href="https://zeit.co" target="_blank" rel="noopener noreferrer">
          Powered by <img src="/zeit.svg" alt="ZEIT Logo" />
        </a>
      </footer>

      {/* Note: these are css-in-js styles but also "pure css/scss modules" are used in this app */}
      <style jsx>
        {`
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          footer img {
            margin-left: 0.5rem;
          }

          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          .description {
            text-align: center;
          }

          .description {
            line-height: 1.5;
            font-size: 1.5rem;
          }

          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }

          .grid {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;

            max-width: 800px;
            margin-top: 3rem;
          }

          .card {
            margin: 1rem;
            flex-basis: 45%;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
          }

          .card:hover,
          .card:focus,
          .card:active {
            color: #0070f3;
            border-color: #0070f3;
          }

          .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }

          .card p {
            margin: 0;
            font-size: 1.25rem;
            line-height: 1.5;
          }

          @media (max-width: 600px) {
            .grid {
              width: 100%;
              flex-direction: column;
            }
          }
        `}
      </style>

      <style jsx global>
        {`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}
      </style>
    </div>
    <nav>
      {allPostsData.map(post => (
        <li className={utilStyles.listItem} key={post.id}>
          <Link href={`/posts/${post.id}`}>
            <a>{post.title}</a>
          </Link>
          <br />
          <small className={utilStyles.lightText}>
            <Date dateString={post.date} />
          </small>
        </li>
      ))}
    </nav>
  </Layout>
);

export default Home;
