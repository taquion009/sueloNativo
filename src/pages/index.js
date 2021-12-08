import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import MainBackground from '../components/MainBackground'
import FrequentQuestions from '../components/FrequentQuestions'
import ListProducts from '../components/ListProducts'
import groq from 'groq'
import { sanity } from '../lib/client'

function Home({ questions, products, background, informacion }) {
  return (
    <Layout informacion={informacion} >
        <Head>
          <title>🌱 Suelo Nativo 🌱</title>
          <meta name="description" content="Suelo Nativo - SOMOS PRODUCTORES 🇦🇷🌱BIOINSUMOS PARA CULTIVO 100% ORGÁNICO🌱⬇️ LIVING SOIL ⬇️▫️BOKASHI TRADICIONAL▫️MICROBOKASHI▫️MULCHING BIOMINERALIZADO"/>
          <meta name="keywords" content="tierra, sustrato, abono, buenos aires, argentina, bioinsumos, orgánico, Living Soil"/>
          <meta name="copyright" content="Propietario del copyright" />
          <meta name="robots" content="index,follow" />
        </Head>
        <main>
          {background && <MainBackground background={background} />}
          {products.length > 0 && <ListProducts products={products} />}
          {questions.length > 0 && <FrequentQuestions questions={questions} />}
        </main>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const queryQuestions = groq`
    *[_type == "PreguntaFrecuentes"] | order(_createdAt asc){_id, pregunta, respuesta}
  `

  const questions = await sanity.fetch(queryQuestions)
  const queryProducts = groq`
    *[_type == "producto"] | order(_createdAt asc)
  `
  const products = await sanity.fetch(queryProducts)
  const queryBackground = groq`
    *[_type == "fondoPrincipal"] | order(_createdAt asc)[0]{img}
  `
  const background = await sanity.fetch(queryBackground)

  const queryinformacion = groq`
        *[_type == "informacion"] | order(_createdAt asc)[0]
    `
    const informacion = await sanity.fetch(queryinformacion)

  return { props: { questions, products, background:background.img, informacion } }
}

export default Home;
