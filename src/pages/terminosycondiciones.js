import React from 'react';
import Layout from '../components/Layout';
import styled from '@emotion/styled';
import groq from 'groq'
import Head from 'next/head'
import { sanity } from '../lib/client'
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


const ContainerStyled = styled.div`
    max-width: 90%;
    margin: 0 auto;
    & p, & h2, & hr{
      margin-bottom: 1rem;
    }
`;
const Terminosycondiciones = ({ text, informacion }) => {
  return (
    <Layout scroll={false} informacion={informacion} >
      <Head>
          <title>Terminos y condiciones - Suelo Nativo</title>
      </Head>
      <main style={{padding:"1em", minHeight: "500px"}}>
        <ContainerStyled itemProp="text">
          <h2>Términos y Condiciones</h2>
          <hr className="wp-block-separator" />
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </ContainerStyled>
      </main>
    </Layout>
  );
};
export const getStaticProps = async () => {
  const queryterminos = groq`
    *[_type == "terminosycondiciones"] | order(_createdAt asc)[0]{terminos}
  `
  const terminos = await sanity.fetch(queryterminos);
  const text = await blocksToHtml({
    blocks: terminos.terminos,
    serializers: {types: {block: BlockRenderer}},
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  })

  const queryinformacion = groq`
  *[_type == "informacion"] | order(_createdAt asc)[0]
  `
  const informacion = await sanity.fetch(queryinformacion)

  return { props:{ text, informacion } }
}

export default Terminosycondiciones;
