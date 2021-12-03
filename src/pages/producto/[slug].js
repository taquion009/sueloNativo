import groq from 'groq'
import Head from "next/head";

import Layout from '../../components/Layout';
import ProductDetail from '../../components/ProductDetail';
import Description from '../../components/Description';
import ProductImages from '../../components/ProductImages';
import FrequentQuestions from '../../components/FrequentQuestions';
import { sanity } from '../../lib/client'
import styled from '@emotion/styled';
import { Grid } from '@mui/material';

import blocksToHyperScript from '@sanity/block-content-to-html'

const e = blocksToHyperScript.renderNode
const blocksToHtml = options => {
  const rootNode = blocksToHyperScript(options)
  return rootNode.outerHTML || rootNode
}

blocksToHtml.defaultSerializers = blocksToHyperScript.defaultSerializers
blocksToHtml.getImageUrl = blocksToHyperScript.getImageUrl
blocksToHtml.renderNode = e
blocksToHtml.h = e
const h = blocksToHtml.h

const BlockRenderer = props => {
  const style = props.node.style || 'normal'

  if (/^h\d/.test(style)) {
    const level = style.replace(/[^\d]/g, '')
    return h('h2', {className: `my-heading level-${level}`}, props.children)
  }

  return props.children[0] === ''
    ? h('br', {className: 'salto'})
    : h('p', props.children)
}

const GridStyled = styled(Grid)`
    & > *{
      width:50%
    }
    @media (max-width: 750px) {
      width: 100%;
      flex-direction: column-reverse;
      & > * {
      width: 100%;
    }
  }
`
const Post = (props) => {
  const volumen = props.preciosPorVolumen.sort((a, b) => a.volumen - b.volumen)

  return (
    <Layout scroll={false}>
      <Head>
        <title>{props.tituloDelProducto}</title>
      </Head>
      <main>
        <GridStyled 
          component="section" 
          direction="row-reverse"
          className="producto-view-container"
          container
          sx={{ 
            p: 2, 
            margin: 'auto', 
            maxWidth: 1200, 
            flexGrow: 1,
            alignItems: "center",
          }}
        > 
         <ProductDetail {...props } volumen={volumen} />
         <ProductImages images={props.images} />
        </GridStyled>
        <Description des={props.des} />
        <FrequentQuestions questions={props.questions} />
      </main>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const query = groq`
    *[_type == "producto"]{tituloDelProducto}
  `
  
  const res = await sanity.fetch(query)
  const slug = res.map(producto => producto.tituloDelProducto.toLowerCase().replace(/ /g, '-'))
  const paths = slug.map((slugn)=>(
    {
      params: {
        slug:slugn
      }
    }
  )
  ) 
 
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const query = groq`
    *[_type == "producto" && lower(tituloDelProducto) == $slug][0]
  `
  const queryQuestions = groq`
    *[_type == "PreguntaFrecuentes"]{_id, pregunta, respuesta}
  `

  const questions = await sanity.fetch(queryQuestions)

  const { slug = "" } = params
  const slugMod = slug.replace(/-/g, ' ')
  const res = await sanity.fetch(query, { slug:slugMod })

  const text = await blocksToHtml({
    blocks: res.descripcion,
    serializers: {types: {block: BlockRenderer}},
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  })

  return { props: { ...res, questions, des:text, slug: slug} }
}

export default Post