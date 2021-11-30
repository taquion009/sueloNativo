import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Home</title>
          <meta name="description" content="Este es el home" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
    </Layout>
  )
}
