import Head from 'next/head';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsApp from './WhatsApp';
import BackToTop from './BackToTop';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div id="back-to-top-anchor"></div>
      {children}
      <Footer />
      <WhatsApp />
      <BackToTop />
    </>
  );
};

export default Layout;
