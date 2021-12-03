import React, { useState, useContext, useEffect } from 'react'
import { Grid, Button, Divider, InputLabel, Select, Input, MenuItem, FormControl, Rating, ButtonGroup } from '@mui/material';
import { store } from '../../context/store'
import { ADD_CART } from '../../context/actions'
import styled from '@emotion/styled';



const ProductDetail = (props) => {
    const { state, dispatch } = useContext(store)
    const [cuantity, setCuantity] = useState(1);
    const [inputError, setInputError] = useState(false)
    const [volumen, setVolumen] = useState(0)

    const handleChangeVolumen = (event) => {
      setVolumen(event.target.value);
    };

    const checkInput = () => {
      if(!/\d/.test(cuantity) || cuantity < 1){
        setInputError(true)
        return true
      }else{
        setInputError(false)
        return false
      }
    }

    const handleChangeCuantity = (event) => {    
      setCuantity(event.target.value); 
    };

    const handleAddCuantity = () => {  
      setCuantity(last=>Number(last)+1)
    }

    const handleSubtractCuantity = () => {
      if(cuantity > 1)setCuantity(last=>last-1)  
    }

    const handleSubmit = e => {
      e.preventDefault()
      dispatch({
        type:ADD_CART,
        payload:{
          _id:props._id,
          quantity:cuantity,
          name:props.tituloDelProducto,
          image:props.images[0],
          price:props.volumen[volumen].priceNow,
          slug:props.slug
        }
      })
    }

    const GridStyled = styled(Grid)`
    & > *,
      & form > * {
        margin: 0.5em 0;
      }

      & .MuiRating-root {
        margin: 0;
      }

      & h1 {
        margin-bottom: 0.5em;
        font-size: 1.6em;
        padding-left: 3px;
      }

      & p {
        line-height: 1.4em;
        letter-spacing: 0.3px;
        font-weight: 100;
        margin-bottom: 1.5em;
      }

      & .p-antencion {
        color: red;
        font-weight: 400;
      }

      & .container-addCart {
        display: flex;
        width: 100%;
        gap: 1em;
        flex-wrap: wrap;
        justify-content: space-around;
      }

      & .price {
        font-size: 1.75em;
        color: #19857b;
      }
     & .buttonsQuantity {
        align-items: center;
      }
      
     & .buttonsQuantity > * {
        display: inline-block;
        width: 40px;
        min-height: 40px;
        box-sizing: border-box;
        text-align: center;
      }
      
     & .buttonsQuantity > input {
        border-color: #19857b80;
        border-width: 1px;
        outline: none;
        border-style: solid;
        border-radius: 0px;
      }
      
     & .buttonsQuantity > input.error,
     & .buttonsQuantity > input.error:hover,
     & .buttonsQuantity > input.error:focus {
        border-color: red;
      }
      
     & .buttonsQuantity > input:hover,
     & .buttonsQuantity > input:focus-visible {
        border-color: #19857b;
        border-width: 1px;
        outline: none;
        border-style: solid;
        border-radius: 0px;
      }
`
  return (
          <GridStyled 
          item 
          sx={{
            padding:"1em",
            margin: "2em 0"
          }}
          className="detail"
          >
            <h1>{props.tituloDelProducto}</h1>
            <Rating name="half-rating-read" defaultValue={props.valoracion} precision={0.5} sx={{margin:"0"}} readOnly />
            <p>{props.descripcionBreve}</p>
            <p className="p-antencion">Seleccioná el volumen para ver los precios.<br/> (1 litro = 1 dm3)</p>
            <p>El pedido mínimo para finalizar tu compra es de $2.000 (en cualquier combinación de productos)</p>
            <Divider />
            <FormControl component="form" fullWidth onSubmit={handleSubmit} >
            <InputLabel id="demo-simple-select-label">Volumen</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={volumen}
              label="Volumen"
              onChange={handleChangeVolumen}
            >
                {
                  props.volumen.map((precio, index)=>{
                    return(
                      <MenuItem value={index} key={index}>{precio.volumen}lts</MenuItem>
                    )
                  })
                }
            </Select>
            <Divider />
            <span className="price">${Number(props.volumen[volumen].priceNow) * cuantity}</span>
            <div className="container-addCart">
              <ButtonGroup 
                color="primary" 
                className="buttonsQuantity"
                >
                <Button
                size="small" 
                variant="outlined"
                onClick={handleSubtractCuantity}
                >-</Button>
                <input 
                  type="number"
                  inputMode="numeric"
                  onChange={handleChangeCuantity}
                  value={cuantity}
                  className={`${inputError?"error":""}`}
                />
                <Button
                size="small" 
                variant="outlined"
                onClick={handleAddCuantity}
                >+</Button>
                </ButtonGroup>
            <Button sx={{minWidth: "100px"}} type="submit" variant="contained">AGREGAR AL CARRITO</Button>
            </div>
            </FormControl >
          </GridStyled>
  );
}

export default ProductDetail;
