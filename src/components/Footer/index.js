import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Image from 'next/image'
import styled from '@emotion/styled';
import logo from '../../../public/logo.svg'

const FooterStyled = styled.footer`
background-color: #212121;
margin-top: 1em;
color: #fff;
& > div {
    margin: auto;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 1em;
    max-width: 1200px;
}
& ul {
    list-style: none;
}
& a {
    color: inherit;
    text-decoration: none;
  }
& span {
    width: 90px;
    align-self: center;
}
& h3 {
    padding: 2px;
    font-weight: 400;
    box-shadow: 0px 2px 0px 0px #fff;
    margin-bottom: 1em;
    color: #fff;
}
& .contactos ul {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-evenly;
    align-items: center;
}
&  li {
    padding: 0.5em 0;
    margin:auto;
}
@media (max-width: 750px) {
    & h3 {
      margin: 1em auto;
      width: 100%;
      margin-top: 2em;
      color: #fff;
    }
    & > div { 
        text-align: center;
        flex-direction: column;
        align-items: stretch;
    }
`
const FigureStyled = styled.figure`
position: relative;
margin-top: 1em;
& > span {
    filter: invert(1)
}
& > figcaption {
    position: absolute;
    width: 100%;
    font-size: 0.9em;
    top: 95px;
    left: 0px;
}
`

const Footer = ({ informacion }) => {
    const [url, setUrl] = useState("/")
    
    useEffect(() => {
        if (typeof window === 'undefined' || informacion.whatsapp === undefined )return;
        const userAgent = navigator.userAgent || navigator.vendor || window.opera
        if (Boolean(/Android|webOS|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(userAgent))) {
            setUrl(`https://api.whatsapp.com/send?phone=54${informacion.whatsapp}&text=`)
        }else{
            setUrl(`https://web.whatsapp.com/send?phone=54${informacion.whatsapp}&text=`)
        }
    },[informacion.whatsapp])


  return (
    <FooterStyled>
      <div>
      <FigureStyled>
            <Image
                src={logo}
                alt='logo'
                width={90}
                height={109}
                layout='fixed'
            />
            <figcaption>
                <h4>Suelo Nativo</h4>
            </figcaption>
        </FigureStyled>
        <div>
            <h3>EXPLORAR</h3>
            <ul>
            <li><Link href='/tienda'><a>Tienda</a></Link></li>
            <li><Link href='/contacto'><a>Contacto</a></Link></li>
            </ul>
        </div>
        <div>
            <h3>LEGALES</h3>
            <ul>
            <li><Link href='/politicadeprivacidad'><a>Política de Privacidad</a></Link></li>
            <li><Link href='/terminosycondiciones'><a>Términos y Condiciones</a></Link></li>
            </ul>
        </div>
        {   (informacion.direccion && informacion.localidad) &&
            <div>
                <h3>VISITANOS</h3>
                <ul>
                <li>{informacion.direccion}</li>
                <li>{informacion.localidad}</li>
                <li>Provincia de Buenos Aires</li>
                </ul>
            </div>
        }
        <div className="contactos">
            <h3>CONTACTANOS</h3>
            <ul>
                {informacion.instagram && <li><a href={informacion.instagram} target="_blank" rel="noopener noreferrer"><InstagramIcon /></a></li>}
                {informacion.facebook && <li><a href={informacion.facebook} target="_blank" rel="noopener noreferrer"><FacebookIcon /></a></li>}
                {informacion.whatsapp && <li><a href={url} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /></a></li>}
            </ul>
        </div>
      </div>
    </FooterStyled>
  );
};

export default Footer;
