import React from 'react';
import Layout from '../components/Layout';
import ListProducts from '../components/ListProducts'
import groq from 'groq'
import { sanity } from '../lib/client'

const Tienda = ({ products, informacion }) => {
  return (
    <Layout scroll={false} informacion={informacion} >
      <main style={{padding:"1em", minHeight: "500px"}}>
        <ListProducts title={"Productos"} products={products} />
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
