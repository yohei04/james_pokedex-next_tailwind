import Head from 'next/head';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="bg-grey-300">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto max-w-xl pt-8 min-h-screen">
        {children}
      </main>
    </div>
  );
};
export default Layout;
