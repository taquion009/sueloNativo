import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import { 
    TextField, 
    Box, 
    Button, 
    Slide, 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Link as LinkStyled,
    Typography } from '@mui/material';
import styled from '@emotion/styled';
import ave from '../../public/ave.svg';
import samurai from '../../public/samurai.svg';
import Image from 'next/image';
import groq from 'groq'
import { sanity } from '../lib/client'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import axios from 'axios' 
import Link from 'next/link';
import ReCAPTCHA from "react-google-recaptcha";

const BoxStyled = styled(Box)`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: flex-start;
    align-items: center;
    gap: 1em;
    width: 100%;
    position: relative;
    min-height: calc(100vh - 70px - 8em);
    & > .MuiFormControl-root {
        border-radius: 5px;
        background: rgb(255, 255, 255);
    }
    & > .button--container{
        background: transparent;
    }
`
const ImageStyled = styled.div`
    position: absolute;
    bottom: 0;
    left: calc(100% - 330px);
    top: calc(100% - 390px + 6em);
    width: 400px;
    height: 400px;
    overflow: hidden;
    z-index: -1;
    @media (max-width: 400px) {
        opacity: 0;
    }
`

const ImageSamuraiStyled = styled.div`
    position: absolute;
    bottom: 0;
    left: -200px;
    top: calc(100% - 400px + 6em);
    width: 400px;
    height: 400px;
    overflow: hidden;
    z-index: -1;
    
`

const OtrosContacts = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    gap: 1em;
    width: 255px;
    max-width: 800px;
    margin: 3em auto;
    background-color:#000;
    color: #fff;
    padding: 1em;
    border-radius: 10px;
    & > div{
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: center;
        justify-content: space-around;
        align-items: center;
    }
    & h3 {
        font-size: 1.25em;
        text-align: center;
    }
    & a {
        padding: 0.5em;
        width: 2.5em;
        border-radius: 50%;
        height: 2.5em;
        text-align: center;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: center;
        align-items: center;
    }
    & .icon-instagram{
        background: #f09433; 
        background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
        background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
        background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );
    }
    & .icon-whatsapp{
        padding: 0.5em 0.5em 0.6em 0.6em;
        background: #25d366;
    }
    & .icon-facebook{
        background: #3b5998;
    }
`;

const DialogTitleStyled = styled(DialogTitle)`
  text-align: center;
`
const DialogActionsStyled = styled(DialogActions)`
  justify-content: space-around;
`
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Contacto = ({ informacion }) => {
    const [url, setUrl] = useState("/")
    const [open, setOpen] = useState(false);
    const [from, setFrom] = useState({
        billing_first_name:"",
        email:"",
        message:""
    })
    const [loading, setLoading] = useState(false)
    const [captchaCode, setCaptchaCode] = useState("")
    const recaptchaRef = React.createRef();
    const handleToggle = () => setOpen(ant => !ant);


    useEffect(() => {
        if (typeof window === 'undefined' || informacion.whatsapp === undefined )return;
        const userAgent = navigator.userAgent || navigator.vendor || window.opera
        if (Boolean(/Android|webOS|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(userAgent))) {
            setUrl(`https://api.whatsapp.com/send?phone=54${informacion.whatsapp}&text=`)
        }else{
            setUrl(`https://web.whatsapp.com/send?phone=54${informacion.whatsapp}&text=`)
        }
    },[informacion.whatsapp])

    const onReCAPTCHAChange = () => {
        if(recaptchaRef.current.getValue()){
            setCaptchaCode(recaptchaRef.current.getValue())
        }
    }

    const handleChange = (e) => {
        setFrom({
            ...from,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)
        if(from.billing_first_name === "" || from.email === "" || from.message === ""){
            setLoading(false)
            alert("Todos los campos son obligatorios")
            return
        }
        axios.post('/api/send-email-contact',
        {
            ...from,
            captcha: captchaCode
        }
        )
        .then(res=>{
            setLoading(false)
            handleToggle()
        })
        .catch((err)=>{
            setLoading(false)
            alert(`No se pudo enviar el mensaje, intente nuevamente, ${err.response?.data?.message}`)
        })
    }



  return (
    <Layout scroll={false} informacion={informacion}>
      <Head>
          <title>Contacto - Suelo Nativo</title>
          <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      </Head>
      <main style={{
          padding:"1em", 
          minHeight: "500px", 
          position:'relative',
          overflow: 'hidden'
          }}>
    <section>
        <BoxStyled
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            >
            <TextField
            placeholder="Enter your name"
            label="Name"
            id="billing_first_name" 
            name="billing_first_name" 
            variant="outlined"
            value={from.billing_first_name}
            onChange={handleChange}
            required
            type="text"
            />
            <TextField
            id="email" 
            name="email" 
            label="Email"
            placeholder="Enter email address"
            variant="outlined"
            value={from.email}
            onChange={handleChange}
            required
            type="email"
            />
            <TextField
            label="Message"
            placeholder="Enter Message"
            variant="outlined"
            name="message"
            id="message"
            multiline
            rows={4}
            value={from.message}
            onChange={handleChange}
            required
            type="text"
            />
            <ReCAPTCHA
                size='normal'
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={onReCAPTCHAChange}
            />
            <div className="button--container">
                <Button variant="contained" type="submit">
                    Enviar
                </Button>
            </div>
            <ImageStyled>
            <Image 
                src={ave} 
                alt="ave"
                width={400}
                height={400}
                layout="fixed" 
            />
        </ImageStyled>
        <ImageSamuraiStyled>
            <Image 
                src={samurai} 
                alt="samurai"
                width={400}
                height={400}
                layout="fixed" 
            />
        </ImageSamuraiStyled>
        </BoxStyled>
        <OtrosContacts>
                <h3>También puedes contactarnos por:</h3>
                <div className="social-icons">
                    {informacion.instagram &&
                    <a href={informacion.instagram} className="icon-instagram" target="_blank" rel="noopener noreferrer">
                        <InstagramIcon />
                    </a>
                    }
                    {informacion.facebook &&
                    <a href={informacion.facebook} className="icon-facebook" target="_blank" rel="noopener noreferrer">
                        <FacebookIcon />
                    </a>
                    }
                    {
                    <a href={url} className="icon-whatsapp" target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon  />
                    </a>
                    }    
                </div>      
            </OtrosContacts>
    </section>
      </main>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleToggle}
                  sx={{
                      width: "100%",
                      "&>div>div": {
                      maxWidth: "450px",
                      }
                  }}
                >
                  <DialogTitleStyled component="div">
                      <Typography variant="h6" severity="success">
                            ¡Gracias por contactarnos!
                      </Typography>   
                  </DialogTitleStyled>
                  <DialogContent>
                    <DialogContentText component="div" id="alert-dialog-slide-description">
                      <p>Tu mensaje ha sido enviado con éxito, en breve nos pondremos en contacto contigo.</p>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActionsStyled>
                    <LinkStyled component="button"
                      variant="body2"
                      onClick={handleToggle}
                    >‹ cerrar  </LinkStyled>
                    <Button variant="contained"><Link href="/"><a>Ir al inicio</a></Link></Button>
                  </DialogActionsStyled>
                </Dialog>
                {loading && <Loader />}
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

export default Contacto;
