import Head from 'next/head';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsApp from './Whatsapp';
import BackToTop from './BackToTop';

const Layout = ({ children, scroll, informacion }) => {
  return (
    <>
      <Head>
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header scroll={scroll === undefined? true : scroll} />
      <div id="back-to-top-anchor"></div>
      {children}
      <Footer informacion={informacion} />
      {informacion.whatsapp && <WhatsApp numero={informacion.whatsapp} />}
      <BackToTop />
    </>
  );
};

export default Layout;
