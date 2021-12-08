import React from 'react';
import Head from 'next/head'
import Layout from '../components/Layout';
import ListProducts from '../components/ListProducts'
import groq from 'groq'
import { sanity } from '../lib/client'

const Tienda = ({ products, informacion }) => {
  return (
    <Layout scroll={false} informacion={informacion} >
      <Head>
          <title>Tienda - Suelo Nativo</title>
      </Head>
      <main style={{padding:"1em", minHeight: "500px"}}>
        <ListProducts tienda={true} title={"Productos"} products={products} />
      </main>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const queryProducts = groq`
    *[_type == "producto"] | order(_createdAt asc)
  `
  const products = await sanity.fetch(queryProducts)

  const queryinformacion = groq`
  *[_type == "informacion"] | order(_createdAt asc)[0]
  `
  const informacion = await sanity.fetch(queryinformacion)

  return { props: { products, informacion } }
}

export default Tienda;
