import React, { ReactElement } from 'react';
import Head from 'next/head';
import { BaseLayout } from '../components/layout/base.layout';

export default function Home(): ReactElement {
  return (
    <BaseLayout>
      <Head>
        <title>Home</title>
      </Head>
      <div>Test</div>
    </BaseLayout>
  );
}
