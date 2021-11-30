import * as React from 'react';
import { Typography, Box, Button } from '@mui/material';
import styled from '@emotion/styled';

function MainBackground() {

  const MainBackgroundStyled = styled.div`
    height: 95vh;
    background: url("https://stallionorganicos.com/wp-content/uploads/2019/06/biology-blur-close-up-822474.jpg")
      no-repeat;
    background-size: cover;
    background-position: center;
    transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
    position: relative;
    }
    
    & .bacground-opacity {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      background-color: rgba(24, 31, 43, 0.62);
      opacity: 0.73;
      z-index: 0;
    }
  `
  const ButtonStyled = styled(Button)`
    color: #fff;
    font-size: 1.15em;
    text-align: center;
    border: 3px solid #fff;
    font-weight: 400;
    padding: 0.5em 1em;
    -webkit-transition: all 0.2s;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    -webkit-letter-spacing: 5px;
    -moz-letter-spacing: 5px;
    -ms-letter-spacing: 5px;
    letter-spacing: 5px;
    border-radius: 5px;
  &:hover {
    border: 3px solid green;
    transform: scale(0.8);
    color: green;
  }
  `

  const TypographyStyled = styled(Typography)`
    color: #fff;
    font-size: 2.5em;
    text-align: center;
    font-weight: 400;
    margin: 0;
    padding: 0 2em;
    margin-top: 3em;
  `

  return (
    <section>
      <MainBackgroundStyled>
        <div className="bacground-opacity"></div>
        <Box
          sx={{
            zIndex:"1",
            position:"relative",
            width:"100%",
            height:"100%",
            display:"flex",
            flexDirection:"column",
            alignContent:"center",
            justifyContent:"center",
            alignItems:"center",
            padding:"1em",
            boxSizing:"border-box",
            gap:"3em",
            overflow:"hidden",
          }}
        >
          <TypographyStyled variant="h1" component="h1" gutterBottom>
            Transformamos desechos, enriquecemos suelos
          </TypographyStyled>
          <ButtonStyled
           variant="outlined" 
           size="medium"
          >!COMPRAR¡
          </ButtonStyled>
        </Box>
      </MainBackgroundStyled>
    </section>
  );
}

export default MainBackground;