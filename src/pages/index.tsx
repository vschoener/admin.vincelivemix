import React from 'react';
import Head from 'next/head';
import { BaseLayout } from '../components/layout/base.layout';

export default function Home() {
  return (
    <BaseLayout>
      <Head>
        <title>Home</title>
      </Head>
      <div className="container">Test</div>
    </BaseLayout>
  );
}
