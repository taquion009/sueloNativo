import React from 'react';
import Product from '../ProductCard';
import styled from '@emotion/styled';


const Container = styled.div`
  width: 100%;
  display: -moz-box;
  display: flex;
  -moz-box-orient: horizontal;
  -moz-box-direction: normal;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  -moz-box-align: start;
  align-items: flex-start;
  gap: 0.25em;
`
const ListProducts = ({ products, title, tienda }) => {
  return (
    <section id="compra" className="section">
        {title !== false && <h2>{title?title:"Nuevos sustraro"}</h2>}
        <Container>
          {
            products.map(product=><Product tienda={tienda} key={product._id} {...product} />)
          }
        </Container>
    </section>
  );
};

export default ListProducts;
