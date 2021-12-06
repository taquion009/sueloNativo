import React from 'react';
import Layout from '../components/Layout';
import { TextField, Box, Button } from '@mui/material';
import styled from '@emotion/styled';
import ave from '../../public/ave.svg';
import samurai from '../../public/samurai.svg';
import Image from 'next/image';
import groq from 'groq'
import { sanity } from '../lib/client'

const BoxStyled = styled(Box)`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    gap: 1em;
    width: 100%;
    max-width: 800px;
    margin: 3em auto;
    & > * {
        background: #fff;
    }
    & > .button--container{
        background: transparent;
    }
`
const ImageStyled = styled.div`
    position: absolute;
    bottom: 0;
    left: calc(100% - 330px);
    top: calc(100% - 390px);
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
    top: calc(100% - 400px);
    width: 400px;
    height: 400px;
    overflow: hidden;
    z-index: -1;
    
`

const Contacto = ({ informacion }) => {
  return (
    <Layout scroll={false} informacion={informacion}>
      <main style={{
          padding:"1em", 
          minHeight: "500px", 
          position:'relative',
          overflow: 'hidden'
          }}>
        <BoxStyled
            component="form"
            noValidate
            autoComplete="off"
            >
            <TextField
            placeholder="Enter your name"
            label="Name"
            id="billing_first_name" 
            name="billing_first_name" 
            variant="outlined"
            //   value={this.state.name}
            //   onChange={(e) => this.setState({ name: e.target.value })}
            required
            type="text"
            />
            <TextField
            id="email" 
            name="email" 
            label="Email"
            placeholder="Enter email address"
            variant="outlined"
            //   value={this.state.email}
            //   onChange={(e) => this.handleChangeEmail(e)}
            //   error={this.state.emailError}
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
            //   value={this.state.message}
            //   onChange={(e) => this.setState({ message: e.target.value })}
            required
            type="text"
            />
            <div className="button--container">
            <Button variant="contained" type="submit">
                {/* {this.state.buttonText} */}
                Enviar
            </Button>
            </div>
        </BoxStyled>
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

export default Contacto;
