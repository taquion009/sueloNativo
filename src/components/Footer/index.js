import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Image from 'next/image'
import styled from '@emotion/styled';

const Footer = () => {
    const [url, setUrl] = useState("/")

    useEffect(() => {
        if (typeof window === 'undefined')return;
        const userAgent = navigator.userAgent || navigator.vendor || window.opera
        if (Boolean(/Android|webOS|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(userAgent))) {
            setUrl("https://api.whatsapp.com/send?phone=541122592209&text=")
            
        }else{
            setUrl("https://web.whatsapp.com/send?phone=541122592209&text=")
        }
    },[])

    const FooterStyled = styled.footer`
        background-color: #222;
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
            box-shadow: 0px 2px 0px 0px green;
            margin-bottom: 1em;
            color: green;
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
              color: green;
            }
            & > div { 
                text-align: center;
                flex-direction: column;
                align-items: stretch;
            }
    `


  return (
    <FooterStyled>
      <div>
        <Image
            src='https://i0.wp.com/stallionorganicos.com/wp-content/uploads/2019/06/Isologotipo-Stallion-e1576032686238.png?fit=100%2C139&ssl=1' 
            alt='logo'
            width={90}
            height={109}
            layout='fixed'
        />
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
        <div>
            <h3>VISITANOS</h3>
            <ul>
            <li>Pablo Coster 1850</li>
            <li>Bella Vista</li>
            <li>Provincia de Buenos Aires</li>
            </ul>
        </div>
        <div className="contactos">
            <h3>CONTACTANOS</h3>
            <ul>
            <li><Link href='https://instagram.com'><a><InstagramIcon /></a></Link></li>
            <li><Link href='https://facebook.com'><a><FacebookIcon /></a></Link></li>
            <li><Link href={url}><a><WhatsAppIcon /></a></Link></li>
            </ul>
        </div>
      </div>
    </FooterStyled>
  );
};

export default Footer;
