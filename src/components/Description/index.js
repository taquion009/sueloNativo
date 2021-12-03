import React from 'react'
import styled from '@emotion/styled';

const DescriptionStyled = styled.div`
    max-width: 1000px;
    width: 80%;
    & div > * {
      margin: 1em 0;
    }

    & h1,
    & h2,
    & h3 {
      text-align: center;
      display: block;
      box-shadow: none;
    }

    & figure {
      text-align: center;
    }
    & ul,
    & ol {
      padding: 0 0 0 1em;
    }
    & h2.my-heading.level-1 {
      font-size: 2.5em;
    }
    & h2.my-heading.level-2 {
      font-size: 2em;
    }
    & h2.my-heading.level-3 {
      font-size: 1.5em;
    }
    & h2.my-heading.level-4 {
      font-size: 1.2em;
    }
    & h2.my-heading.level-5 {
      font-size: 1em;
    }
    & h2.my-heading.level-6 {
      font-size: 0.8em;
    }
    & a {
      color: #0070f3;
      text-decoration: underline;
    }
    @media (max-width: 750px) {
      width: 100%;
    }
`

const Descripción = (props) => {
  return (
  <section className="section">
      <h2>Descripción</h2>
      <DescriptionStyled dangerouslySetInnerHTML={{__html:props.des}}></DescriptionStyled>
  </section>)
}


export default Descripción;
