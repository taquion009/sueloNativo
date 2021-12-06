import React, { useState, useEffect }  from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Fab from '@mui/material/Fab';
import styled from '@emotion/styled';

const WhatsApp = ({ numero }) => {
  const [url, setUrl] = useState("")
  
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    if (typeof window === 'undefined') return;
    if (Boolean(/Android|webOS|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(userAgent))) {
      setUrl(`https://api.whatsapp.com/send?phone=54${numero}&text=`)
    }else{
      setUrl(`https://web.whatsapp.com/send?phone=54${numero}&text=`)
    }
  },[numero])

  const WhatsappStyled = styled(Fab)`
    width: 60px;
    height: 60px;
    position: fixed;
    top: calc(100% - 80px);
    left: calc(100% - 80px);
    background-color: #25d366;
    border-radius: 50%;
    -webkit-box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.16);
    -moz-box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.16);
    box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.16);
    cursor: pointer;
    z-index: 9999;
    & > * {
      color: #fff;
      max-width: 100%;
      height: auto;
      width: 100%;
      padding: 0.17em 0.3em 0.3em 0.4em;
    }
    &:hover {
      background-color: #25d366;
      transform: scale(1.1);
    }
  `;

  return (
    <WhatsappStyled component="a" href={url} target="_back" className="Whatsapp-icon" aria-label="whatsapp">
      <WhatsAppIcon />
    </WhatsappStyled>
  );
}

export default WhatsApp;