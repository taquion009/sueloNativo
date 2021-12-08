import * as React from 'react';
import Link from 'next/link';
import SwipeableViews from 'react-swipeable-views';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTheme } from '@mui/material/styles';
import {Box, MobileStepper, Button, Card, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import { sanity } from '../../lib/client'
import imageUrlBuilder from '@sanity/image-url'
import styled from '@emotion/styled';

function urlFor (source) {
  return imageUrlBuilder(sanity).image(source)
}

const SwipeableViewsStyled = styled(SwipeableViews)`
   & div {
      display: flex;
      align-items: center;
      width: 100%;
    }

    & div a {
      width: 100%;
    }
`

const MobileStepperStyled = styled(MobileStepper)`
  & > * {
    z-index: 1;
  }

  & .MuiMobileStepper-dots {
    align-self: flex-end;
  }

  & .MuiMobileStepper-dotActive {
    background-color: #fff;
  }
`

const Oferta = styled.div`
  position: absolute;
  top: calc(100% - 32px - 1em);
  width: 60px;
  left: calc(100% - 60px - 1em);
  background-color: #fff;
  padding: 0.5em;
  border-radius: 0.5em;
  font-size: 0.8em;
  font-weight: bold;
  color: #000;
  text-transform: uppercase;
  z-index: 1;
  text-align: center;
`

const Precios = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1em;
  text-align: center;
  text-transform: uppercase;
  font-size: 0.8em;
  font-weight: bold;
  color: #000;
  gap:1em;
  & > .precioAnterior {
    text-decoration: line-through;
    color: #999;
  }
`


function ProductCard(props) {
  const { images, tituloDelProducto, valoracion, oferta, priceNow, precioAnterior, tienda } = props
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [drag, setDrag] = React.useState(false);
  const maxSteps = images.length;

  const handleNext = () => {
    if(activeStep === maxSteps-1){
      setActiveStep(0);
    }else{
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  }

  const handleBack = () => {
    if(activeStep === 0){
        setActiveStep(maxSteps-1);
    }else{
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  }

  const handleStepChange = (step) => setActiveStep(step);


  return (
    <Card sx={{
      position: "relative",
      border:"none",
      boxShadow:"none",
      maxWidth:"100%",
      border:"none",
      boxShadow:"none",
     '@media(min-width: 700px)':{
        width:"calc(50% - 1em)",
      },
      '@media(min-width: 900px)':{
        maxWidth:"280px",
        width:"calc(50% - 1em)",
      }
    }} >
      <Box sx={{position:"relative"}}>
      {oferta && <Oferta>Oferta</Oferta>}
        <MobileStepperStyled
          className="nav-product"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
            background: "transparent",
            boxSizing: "border-box",
          }}
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              sx={{
                color:"#fff",
                zIndex: "1"
              }}
            >
              {theme.direction === 'rtl' ? (
                <ArrowBackIosIcon />
              ) : (
                <ArrowForwardIosIcon />
              )}
            </Button>
          }
          
          backButton={
            <Button 
            size="small" 
            onClick={handleBack}
            sx={{
              color:"#fff",
              zIndex: "1"
            }}
            >
              {theme.direction === 'rtl' ? (
                <ArrowForwardIosIcon />
              ) : (
                <ArrowBackIosIcon />
              )}
            </Button>
          }
        />
        <SwipeableViewsStyled
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          onSwitching={(e)=>{
            if(!drag)setDrag(true)
          }}
          onTransitionEnd={(e)=>{
            if(drag)setDrag(false)
          }}
        >
          {images.map((step, index) => (
            <div key={index}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Link 
                  href={`/producto/${tituloDelProducto.toLowerCase().replace(/ /g, '-')}`}
                >
                <a onClick={(e)=>{
                  if(drag)e.preventDefault()
                  }}>
                <CardMedia
                component="img"
                src={`${urlFor(step).width(300).height(300).url()}`}
                alt={index}
                draggable="false"
                sx={{
                  height: "255",
                  display: "block",
                  maxWidth: "400",
                  overflow: "hidden",
                  width: "100%",
                }}
                />
                </a>
                </Link>
                ) : null}
              </div>
          ))}
        </SwipeableViewsStyled>
      </Box>
        <CardContent
        sx={{
          display:"flex",
          flexDirection:"column",
          justifyContent:"space-evenly",
          alignItems:"center",
          alignContent:"center",
          gap:"1em",
          fontSize: "1.125rem"
        }}
        >
            <Link href={`/producto/${tituloDelProducto.toLowerCase().replace(/ /g, '-')}`} passHref>
                <Typography 
                  variant="h4"
                  gutterBottom
                  component="h4"
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    textAlign: "center",
                    margin:"0 auto",
                    cursor:"pointer",
                    fontweight: "600",
                    fontFamily: "'Roboto'",
                    fontSize:"1.125em",
                    // textTransform: "uppercase",
                    fontWeight: "bold"
                  }}
                >
                  {tituloDelProducto}    
                </Typography>
            </Link>
            {tienda && 
            <Precios>
              {precioAnterior &&
                 <span className="precioAnterior">Desde: ${precioAnterior}</span>
              }
              <span>Desde: ${priceNow}</span>
           </Precios>
            }
          <Rating name="half-rating-read" defaultValue={valoracion} precision={0.5} readOnly />
        </CardContent>
      </Card>
  );
}

export default ProductCard;