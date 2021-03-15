import React from 'react';
import Head from 'next/head';

const Metatags: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
    </Head>
  );
};

export default Metatags;
