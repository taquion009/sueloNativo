import React, { useState, useContext, useEffect } from 'react'
import { Grid, Button, Divider, InputLabel, Select, MenuItem, FormControl, Rating, ButtonGroup } from '@mui/material';
import { store } from '../../context/store'
import { ADD_CART } from '../../context/actions'
import { findProduct } from '../../context/use-local-storage'
import styled from '@emotion/styled';
import imageSafery from '../../../public/safely-mercado.png'
import Image from 'next/image'

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
    border-width: 1px;
    outline: none;
    border-style: solid;
    border-radius: 0px;
  }
`

const ProductDetail = (props) => {
    const { state, dispatch } = useContext(store)
    const [cuantity, setCuantity] = useState(1);
    const [inputError, setInputError] = useState(false)
    const [volumen, setVolumen] = useState(0)
    

    useEffect(() => {
      const id  = props._id + '+' + props.volumen[volumen].volumen
      let  cuanti = findProduct(state.cart,{_id:id})?.quantity
      ? findProduct(state.cart,{_id:id}).quantity : 1
      setCuantity(cuanti)
    }, [volumen, props._id, props.volumen, state.cart])



    const handleChangeVolumen = (event) => {
      setVolumen(event.target.value);
    };

    const checkInput = (valor) => {
      if(!/\d/.test(valor) || valor < 1){
        setInputError(true)
        return true
      }else{
        setInputError(false)
        return false
      }
    }

    const handleChangeCuantity = (event) => {    
      checkInput(event.target.value)
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
      if(inputError)return null
      dispatch({
        type:ADD_CART,
        payload:{
          _id:`${props._id}+${props.volumen[volumen].volumen}`,
          quantity:cuantity,
          name:props.tituloDelProducto + ' ' + props.volumen[volumen].volumen + "Lts",
          image:props.images[0],
          price:props.volumen[volumen].priceNow,
          slug:props.slug,
          volumen:props.volumen[volumen].volumen,
        }
      })
    }

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
            <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid</p>
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
            <Divider />
              <Image 
                src={imageSafery}
                alt="Seguro mercado pago"
                width={300}
                height={61}
                layout="fixed"
              />
            </FormControl >
          </GridStyled>
  );
}

export default ProductDetail;
