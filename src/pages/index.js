import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import MainBackground from '../components/MainBackground'

export default function Home() {
  return (
    <Layout>
        <Head>
          <title>Home</title>
          <meta name="description" content="Este es el home" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainBackground />
    </Layout>
  )
}
