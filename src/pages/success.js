import Head from 'next/head'
import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import styled from '@emotion/styled';
import groq from 'groq'
import { sanity } from '../lib/client'
import Link from 'next/link';
import samurai from '../../public/samurai.svg';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Image from 'next/image';
import Router from 'next/router';
import { store } from '../context/store'
import { CLEAR_CART } from '../context/actions'

const SuccessContainer = styled.section`
  padding: 1em;
  margin: 0 auto;
  max-width: 700px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  align-content: center;
  flex-wrap: nowrap;
  grid-gap: 1em;
  gap: 1em;
  border: 2px solid #eee;
  border-radius: 10px;
  min-height: 500px;
  background: #fff;
  text-align: center;
  h1{
    border:none;
    margin-bottom:0;
    box-shadow:none;
  }
  a{
    color: #00e;
    text-decoration: underline;
  }
`;

const ImageSamuraiStyled = styled.div`
    position: absolute;
    bottom: 0;
    left: -200px;
    top: calc(100% - 400px);
    width: 400px;
    height: 400px;
    overflow: hidden;
    z-index: -1;
    
`

const Success = ({ informacion }) => {
  const payment_id = Router.router?.query?.payment_id
  const { dispatch } = useContext(store)

  useEffect(() => {
    if (payment_id) {
      dispatch({ type:CLEAR_CART })
    }
  }, [payment_id, dispatch])

  return (
    <Layout scroll={false} informacion={informacion} >
      <Head>
          <title>Compra exitosa - Suelo Nativo</title>
      </Head>
      <main style={{padding:"1em", minHeight: "500px", position:"relative", overflow:"hidden"}}>
        <SuccessContainer>
          <LocalMallIcon style={{fontSize: "100px"}}/>
          <h1>¡Gracias por su compra!</h1>
          <p>Tu compra ha sido exitosa.</p>
          <p>En breve recibirás un correo con los detalles de tu compra.</p>
          <p>Si tienes alguna duda, puedes contactarnos en el apartado de <Link href="/contacto">contacto</Link> con su numero de pedido.</p>
          <p><span className="numero-pedido">Número de pedido:</span> {payment_id}</p>
        </SuccessContainer>
      <ImageSamuraiStyled>
            <Image 
                src={samurai} 
                alt="samurai"
                width={400}
                height={400}
                layout="fixed" 
                />
      </ImageSamuraiStyled>
      </main>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const queryinformacion = groq`
  *[_type == "informacion"] | order(_createdAt asc)[0]
  `
  const informacion = await sanity.fetch(queryinformacion)

  return { props:{ informacion } }
}

export default Success;
