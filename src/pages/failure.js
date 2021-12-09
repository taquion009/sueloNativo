import Head from 'next/head'
import React from 'react';
import Layout from '../components/Layout';
import styled from '@emotion/styled';
import groq from 'groq'
import Link from 'next/link';
import { sanity } from '../lib/client'
import ErrorIcon from '@mui/icons-material/Error';
import ave from '../../public/ave.svg';
import Image from 'next/image';

const FailureContainer = styled.section`
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

const ImageStyled = styled.div`
    position: absolute;
    bottom: 0;
    left: calc(100% - 330px);
    top: calc(100% - 390px);
    width: 400px;
    height: 400px;
    overflow: hidden;
    z-index: -1;
    @media (max-width: 400px) {
        opacity: 0;
    }
`

const Failure = ({ informacion }) => {
return (
    <Layout scroll={false} informacion={informacion} >
      <Head>
          <title>No se pudo procesar el pago - Suelo Nativo</title>
      </Head>
      <main style={{padding:"1em", minHeight: "500px", position:"relative", overflow:"hidden"}}>
        <FailureContainer>
          <ErrorIcon style={{fontSize: "100px", marginBottom: "1em"}}/>
          <h1>No se pudo procesar su pago</h1>
          <p>
            <Link href="/">
              <a>Volver a la tienda</a>
            </Link>
          </p>
        </FailureContainer>
        <ImageStyled>
            <Image 
                src={ave} 
                alt="ave"
                width={400}
                height={400}
                layout="fixed" 
            />
        </ImageStyled>
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

export default Failure;
