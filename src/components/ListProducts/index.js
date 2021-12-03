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

const ListProducts = ({ products }) => {
  return (
    <section className="section">
        <h2>Nuevos sustraro</h2>
        <Container>
          {
            products.map(product=><Product key={product._id} {...product} />)
            
          }
        </Container>
    </section>
  );
};

export default ListProducts;
