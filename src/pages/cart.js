import Head from 'next/head'
import React, { useContext, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link'
import Image from 'next/image'
import { TableCell, TableContainer, TableHead, TableRow, Paper, TableBody, Table, ButtonGroup, Button, IconButton, TableFooter } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import styled from '@emotion/styled';

import imageUrlBuilder from '@sanity/image-url'
import groq from 'groq'
import { store } from '../context/store'
import { sanity } from '../lib/client'

function urlFor (source) {
    return imageUrlBuilder(sanity).image(source)
}


const ButtonsQuantity = styled(ButtonGroup)`
  align-items: center;
  & > *{
    display: inline-block;
    width: 40px;
    min-height: 40px;
    box-sizing: border-box;
    text-align: center;
  }

  & > input {
    border-color: #21212180;
    border-width: 1px;
    outline: none;
    border-style: solid;
    border-radius: 0px;
  }

  & > input.error,
  & > input.error:hover,
  & > input.error:focus {
    border-color: red;
  }

  & > input:hover,
  & > input:focus-visible {
    border-color: #212121;
    border-width: 1px;
    outline: none;
    border-style: solid;
    border-radius: 0px;
  }
`

const TableRowHeadStyled = styled(TableRow)`
  background-color: rgba(0, 0, 0, 0.87);
  & > th {
    color: #ffffff;
  }
`

const TableRowHeadStyledMoblie = styled(TableRow)`
  // background-color: rgba(0, 0, 0, 0.87);
  // & > th {
  //   color: #ffffff;
  // }
`

const TableRowBodyStyled = styled(TableRow)`
  &:nth-of-type(2n + 1) {
    background: #efefefa6;
  }

  & .th-name {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    align-content: space-around;
    flex-wrap: nowrap;
    flex-direction: row;
    padding-bottom: 16.5px;
    gap:1em;
  }

  & .th-name > img {
    width: 70px;
  }

  & .th-name > button {
    margin-right: 1em;
  }

`

const TableRowBodyStyledMoblie = styled(TableRow)`
  width: 100%;
  // &:nth-of-type(2n + 1) {
  //   background: #efefefa6;
  // }

  & .th-name {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    align-content: space-around;
    flex-wrap: nowrap;
    flex-direction: row;
    padding-bottom: 16.5px;
    gap:1em;
  }

  & .th-name > img {
    width: 70px;
  }

  & .th-name > button {
    margin-right: 1em;
  }

`

const TableFooterStyled = styled.div`
  display: flex;
  padding: 1em;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
`

const TableFooterStyledMoblie = styled.div`
  display: flex;
  padding: 1em;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
`

const TableContainerStyled = styled(TableContainer)`
  & td{
    width: 50%;
  }
`

const Cart = ({ informacion }) => {
  const { state } = useContext(store)
  const [changeQuantity, setChangeQuantity] = useState(false)
  const [update, setUpdate] = useState(false)
  const [loadingUpdate, seLoadingUpdate] = useState(false)
  const [widthScreen, setWidthScreen] = useState(0)

  useEffect(()=>{
    if(window){
      setWidthScreen(window.innerWidth)
      window.addEventListener('resize', () => {
        setWidthScreen(window.innerWidth)
      })
    }
  }
  ,[])

  const handleUpdate = () => {
    setUpdate(true)
    seLoadingUpdate(true)
    setTimeout(()=>{
      setUpdate(false)  
      setChangeQuantity(false)  
      seLoadingUpdate(false)
    }, 500)
  }


  return (
    <Layout scroll={false} informacion={informacion} >
      <Head>
          <title>Carrito - Suelo Nativo</title>
      </Head>
      <main style={{padding:"1em", minHeight: "500px"}}>
        <section className="section" style={{gap:"0"}}>
      {widthScreen > 600 ? (
      <TableContainer component={Paper} sx={{maxWidth:"1200px", margin: "1em auto 0 auto", boxShadow: "none"}}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRowHeadStyled>
            <TableCell>	PRODUCTO </TableCell>
            <TableCell align="right">PRECIO</TableCell>
            <TableCell align="right">CANTIDAD</TableCell>
            <TableCell align="right">SUBTOTAL</TableCell>
          </TableRowHeadStyled>
        </TableHead>
        <TableBody>
          {state.cart.length > 0
           ? state.cart.map((product) =>
            <RowProductCart
              changeQuantity={changeQuantity} 
              setChangeQuantity={setChangeQuantity} 
              product={product}
              update={update}
              key={product.name}
            />)
          :<TableRowBodyStyled>
              <TableCell component="th" scope="row">
                No se encuentra ningún producto
              </TableCell>
              <TableCell component="th" scope="row" />
              <TableCell component="th" scope="row" />
              <TableCell component="th" scope="row" />
            </TableRowBodyStyled>

          }
        </TableBody>
        </Table>
        </TableContainer>
        )
      :(
        <>
        {state.cart.length > 0
            ? state.cart.map((product) =>
                  <RowProductCartMoblie
                    key={product.name}
                    product={product}
                  />
            ):(
              <TableContainer component={Paper} sx={{maxWidth:"1200px", margin: "1em auto 0 auto", boxShadow: "none"}}>
              <Table>
                  <TableHead>
                    <TableRowHeadStyled>
                      <TableCell>	PRODUCTO </TableCell>
                      <TableCell align="right">PRECIO</TableCell>
                      <TableCell align="right">CANTIDAD</TableCell>
                      <TableCell align="right">SUBTOTAL</TableCell>
                    </TableRowHeadStyled>
                  </TableHead>
                  <TableBody>
                    <TableRowBodyStyled>
                      <TableCell component="th" scope="row">
                        No se encuentra ningún producto
                      </TableCell>
                      <TableCell component="th" scope="row" />
                      <TableCell component="th" scope="row" />
                      <TableCell component="th" scope="row" />
                    </TableRowBodyStyled>
                  </TableBody>
                </Table>
                </TableContainer>
            )}
        </>
        )
      }
        {
          widthScreen > 600 && (
          <TableFooterStyled>
            <Button variant="contained" onClick={handleUpdate} disabled={!changeQuantity || loadingUpdate}>{loadingUpdate?"Actualizando...":"Actualizar"}</Button>
          </TableFooterStyled>
          )
        }
        </section>
        {state.cart.length > 0 &&
          <section>
          <TableContainerStyled 
            component={Paper} 
            sx={{
              maxWidth:"600px",
               margin: "1em auto 0 auto", 
               boxShadow: "none", 
               border: "1px solid #e0e0e0"
               }}
          >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"  colSpan="2">TOTAL DEL CARRITO</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="right">SubTotal:</TableCell>
                  <TableCell>{state.cart.length > 0 ? state.cart.reduce((total, product) => total + product.price * product.quantity, 0) : 0}	</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Total:</TableCell>
                  <TableCell>{state.cart.length > 0 ? state.cart.reduce((total, product) => total + product.price * product.quantity, 0) : 0}</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell align="center" colSpan="2">
                    <Link href="/checkout" passHref>
                      <Button variant="contained" sx={{width:"100%"}}>Finalizar compra</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainerStyled>
        </section>}
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

export default Cart;


const RowProductCart = ({ product, changeQuantity, setChangeQuantity, update }) => {
  const { dispatch } = useContext(store)
  const [quantity, setQuantity] = useState(Number(product.quantity))

  const handleChangeCuantity = (event) => {    
    setQuantity(event.target.value);
    if(!changeQuantity)setChangeQuantity(true)
  };

  const handleCuantity = (value) => {
    if(!/\d/.test(value) || isNaN(value) || value < 1 || value % 1 !== 0  || value > product.stock){
      // setInputError(true)
      return true
    }else{
      // setInputError(false)
      return false
    }
  } 

  const handleAddCuantity = () => { 
    if(handleCuantity(Number(quantity) + 1))return
    setQuantity(last=>Number(last)+1)
    if(!changeQuantity)setChangeQuantity(true)
  }

  const handleSubtractCuantity = () => {
    if(quantity > 1)setQuantity(last=>last-1)
    if(!changeQuantity)setChangeQuantity(true)
  }

  const deleteProduct = () => {
    dispatch({type:"DELETE_ITEM_CART",payload:product})
  }

  useEffect(()=>{
    if(!update || quantity === product.quantity)return
    if(handleCuantity(quantity))return
    dispatch({type:"UPDATE_QUANTITY",payload:{...product, quantity:quantity}})
  },[update, dispatch, quantity, product,handleCuantity])




  return(
    <TableRowBodyStyled key={product.name}>
      <TableCell component="th" className="th-name" scope="row">
        <IconButton variant="outlined" onClick={deleteProduct}>
          <ClearIcon />
        </IconButton>
          <Image 
            src={`${urlFor(product.image).width(100).height(100).url()}`}
            alt="producto imagen"
            width={100}
            height={100}
          />
        {product.name}
      </TableCell>
      <TableCell align="right">${product.price}</TableCell>
      <TableCell align="right">
      <ButtonsQuantity color="primary">
        <Button
        size="small" 
        variant="outlined"
        onClick={handleSubtractCuantity}
        >-</Button>
        <input 
          type="number"
          inputMode="numeric"
          onChange={handleChangeCuantity}
          value={quantity}
          style={{border:handleCuantity(quantity)?"1px solid red":""}}
        />
        <Button
        size="small" 
        variant="outlined"
        onClick={handleAddCuantity}
        >+</Button>
        </ButtonsQuantity>
      </TableCell>
      <TableCell align="right">${product.price * product.quantity}</TableCell>
    </TableRowBodyStyled>
  )
}


const RowProductCartMoblie = ({ product }) => {
  const { dispatch } = useContext(store)
  const [quantity, setQuantity] = useState(Number(product.quantity))
  const [changeQuantity, setChangeQuantity] = useState(false)
  const [update, setUpdate] = useState(false)
  const [loadingUpdate, seLoadingUpdate] = useState(false)

  const handleUpdate = () => {
    setUpdate(true)
    seLoadingUpdate(true)
    setTimeout(()=>{
      setUpdate(false)  
      setChangeQuantity(false)  
      seLoadingUpdate(false)
    }, 500)
  }

  const handleCuantity = (value) => {
    if(!/\d/.test(value) || isNaN(value) || value < 1 || value % 1 !== 0  || value > product.stock){
      // setInputError(true)
      return true
    }else{
      // setInputError(false)
      return false
    }
  } 

  const handleChangeCuantity = (event) => {    
    setQuantity(event.target.value);
    if(!changeQuantity)setChangeQuantity(true)
  };

  const handleAddCuantity = () => {  
    if(handleCuantity(Number(quantity)+1))return
    setQuantity(last=>Number(last)+1)
    if(!changeQuantity)setChangeQuantity(true)
  }

  const handleSubtractCuantity = () => {
    if(quantity > 1)setQuantity(last=>last-1)
    if(!changeQuantity)setChangeQuantity(true)
  }

  const deleteProduct = () => {
    dispatch({type:"DELETE_ITEM_CART",payload:product})
  }

  useEffect(()=>{
    if(!update || quantity === product.quantity)return
    if(handleCuantity(quantity))return
    dispatch({type:"UPDATE_QUANTITY",payload:{...product, quantity:quantity}})
  },[update, dispatch, quantity, product, handleCuantity])

  return(
    <TableContainer component={Paper} sx={{maxWidth:"1200px", border:" 1px solid #eee", margin: "1em auto 0 auto", boxShadow: "none"}}>
              <Table>
                <TableHead>
                  <TableRowHeadStyledMoblie>
                    <TableCell>{product.name}</TableCell>
                    <TableCell align="right"><Image alt={product.name} width={100} height={100} src={urlFor(product.image).width(100).url()} /></TableCell>
                  </TableRowHeadStyledMoblie>
                </TableHead>
                <TableBody>
      <TableRowBodyStyledMoblie>
        <TableCell>
          <h4>precio: </h4>
        </TableCell>
        <TableCell>${product.price}</TableCell>
      </TableRowBodyStyledMoblie>
      <TableRowBodyStyledMoblie>
        <TableCell>
          <h4>Cantidad</h4>
        </TableCell>
        <TableCell>
          <ButtonsQuantity color="primary">
        <Button
        size="small" 
        variant="outlined"
        onClick={handleSubtractCuantity}
        >-</Button>
        <input 
          type="number"
          inputMode="numeric"
          onChange={handleChangeCuantity}
          value={quantity}
          style={{border:handleCuantity(quantity)?"1px solid red":""}}
          // className={`${inputError?"error":""}`}
        />
        <Button
        size="small" 
        variant="outlined"
        onClick={handleAddCuantity}
        >+</Button>
        </ButtonsQuantity>
      </TableCell>
      </TableRowBodyStyledMoblie>
      </TableBody>
      </Table>
      <TableFooterStyledMoblie>
        <IconButton variant="outlined" onClick={deleteProduct}>
            <ClearIcon />
        </IconButton>
        <Button variant="contained" onClick={handleUpdate} disabled={(!changeQuantity || loadingUpdate) || handleCuantity(quantity)}>{loadingUpdate?"Actualizando...":"Actualizar"}</Button>
      </TableFooterStyledMoblie>
      </TableContainer>
  )
}
