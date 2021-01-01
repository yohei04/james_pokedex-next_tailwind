import Head from 'next/head';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="bg-gray-300">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container max-w-xl min-h-screen pt-8 mx-auto">
        {children}
      </main>
    </div>
  );
};
export default Layout;
