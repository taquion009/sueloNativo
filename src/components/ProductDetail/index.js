import React, { useState, useContext, useEffect } from 'react'
import { 
    Grid,
    Button, 
    Divider, 
    InputLabel,
    Select,
    MenuItem, 
    FormControl, 
    Rating, 
    ButtonGroup, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    DialogActions,
    Slide,
    Alert,
    Link as LinkStyled } from '@mui/material';
import { store } from '../../context/store'
import { ADD_CART } from '../../context/actions'
import { findProduct } from '../../context/use-local-storage'
import styled from '@emotion/styled';
import imageSafery from '../../../public/safely-mercado.png'
import Image from 'next/image'
import Link from 'next/link'
import imageUrlBuilder from '@sanity/image-url'
import { sanity } from '../../lib/client'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function urlFor (source) {
    return imageUrlBuilder(sanity).image(source)
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
  & .added-cart{
    width: 100px;
    height: 20px;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    align-items: center;
  }
`

const DialogTitleStyled = styled(DialogTitle)`
  & > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 0.5em;
  }
  & > div > h3{
    font-size: 1em;
  }
  & > p{
    font-size: 0.8em;
  }
`
const DialogActionsStyled = styled(DialogActions)`
  justify-content: space-around;
`

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductDetail = (props) => {
    const { state, dispatch } = useContext(store)
    const [cuantity, setCuantity] = useState(1);
    const [inputError, setInputError] = useState(false)
    const [volumen, setVolumen] = useState(0)
    const [open, setOpen] = useState(false)
    

    useEffect(() => {
      const id  = props._id + '+' + props.volumen[volumen].volumen
      let  cuanti = findProduct(state.cart,{_id:id})?.quantity
      ? findProduct(state.cart,{_id:id}).quantity : 1
      setCuantity(cuanti)
    }, [volumen, props._id, props.volumen, state.cart])


    const handleToggle = () => {
      setOpen(anterior => !anterior)
    }

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
                <Button onClick={handleToggle} sx={{minWidth: "100px"}} type="submit" variant="contained">AGREGAR AL CARRITO</Button>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleToggle}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitleStyled component="div">
                    <div>
                      <Image 
                          src={`${urlFor(props.images[0]).width(50).height(50).url()}`}
                          alt="imagen del producto agregado"
                          width={50}
                          height={50}
                          layout="fixed"
                        />
                        <h3>{props.tituloDelProducto}</h3>
                      </div>
                      <p>volumen: {props.volumen[volumen].volumen}Lts</p>
                      <p>cantidad: {cuantity}</p>
                      <p>precio: ${Number(props.volumen[volumen].priceNow) * cuantity}</p>
                  </DialogTitleStyled>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      <Alert sx={{mb:"0.5em"}} severity="success">Producto añadido correctamente a su carrito de la compra</Alert>
                      <p>Hay {state.cart.length} productos en el carrito</p>
                      <p>Total de productos: ${state.cart.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActionsStyled>
                    <LinkStyled component="button"
                      variant="body2"
                      onClick={handleToggle}
                    >‹ Continuar la compra</LinkStyled>
                    <Button variant="contained"><Link href="/cart"><a>Ir al carrito</a></Link></Button>
                  </DialogActionsStyled>
                </Dialog>
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
