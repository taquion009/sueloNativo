import React, { useContext, useState, useEffect } from "react";
import Layout from '../components/Layout';
import axios from 'axios';
import { store } from '../context/store'
import Loader from '../components/Loader';
import validateForm from "../helpers/validateFrom";
import Image from 'next/image'
import groq from 'groq'
import { sanity } from '../lib/client'
import styled from '@emotion/styled';

import { 
  FormControl, 
  Box, 
  InputLabel,
  Input, 
  Button, 
  Grid, 
  TableCell, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  FormControlLabel, 
  Radio, 
  RadioGroup, 
  FormLabel, 
  Checkbox,
  TextField,
  Divider,
  Select,
  MenuItem
} from '@mui/material';



const MpCheckoutStyled = styled.div`
  & .mp-img-tarjetas {
    padding: 8px!important;
    height: unset!important;
    width: 50px!important;
    position: relative!important;
    min-width: auto!important;
    display: inline-block!important;
  }
  & span {
    width: auto!important;
    height: auto;
    position: relative!important;
    object-fit: cover;
    display: inline-block!important;
  }

  & .mp-redirect-frame {
    width: calc(100% - 4em);
    text-align: center;
    background-color: #f5f5f5;
    padding: 25px 20px 20px;
    display: block;
    margin: 0 auto;
    min-width: 200px;
  }
  & .mp-terms-and-conditions {
    height: 18px;
    padding: 16px;
    font-family: sans-serif;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    color: rgba(0,0,0,.9);
    margin-bottom: 2em;
  }
  & .mp-terms-and-conditions a {
    color: #009ee3;
  }

  & .mp-redirect-frame-img > span img{
    padding: 8px!important;
    height: unset!important;
    width: 200px!important;
    position: relative!important;
    min-width: auto!important;
    display: inline-block!important;
  }

  & .mp-redirect-frame-img > span{
    width: auto!important;
    height: auto;
    position: relative!important;
    object-fit: cover;
    display: inline-block!important;
  }
  
`   

const BoxStyled = styled(Box)`
  & p, & .check-polite, & table{
    margin-bottom: 1rem;
  }

`

const Checkout = ({ informacion }) => {
  const { state } = useContext(store)
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    billing_first_name: {value: '', error: false},
    billing_last_name: {value: '', error: false},
    email: {value: '', error: false},
    id_type: {value: '', error: false},
    billing_state: {value: 'Buenos Aires', error: false},
    billing_: {value: '', error: false},
    billing_city: {value: '', error: false},
    billing_address_1: {value: '', error: false},
    billing_address_2: {value: '', error: false},
    phone: {value: '', error: false},
    pais: {value:'Argentina', error:false},
    street_number: {value: '', error: false},
    street_name: {value: '', error: false},
    city: {value: '', error: false},
    zip: {value: '', error: false},
  });

  useEffect(() => {
    if (preferenceId) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://sdk.mercadopago.com/js/v2';
        script.addEventListener('load', addCheckout);
        document.body.appendChild(script);
    }
    }, [preferenceId, addCheckout]);


  function addCheckout() {
    const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY, {
      locale: 'es-AR'
    });
    
    mp.checkout({
      preference: {
        id: preferenceId,
      },
      autoOpen: true,
    });
  }

  const handleChange = (event) => {
    const valideted = validateForm(event.target.name, event.target.value);
    setForm({
      ...form,
      [event.target.name]: {error:valideted,value:event.target.value }
    });
  };
  
  const getFormValues = () => {
    const formValues = {};
    Object.keys(form).forEach(field => {
      formValues[field] = form[field].value;
    });
    return formValues;
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault()
    axios
      .post("/api/create-payment",
      {
        store: state.cart,
        form: getFormValues(),
 
      }
      ).then((data) => {
        setLoading(false);
        setPreferenceId(data?.data?.data?.response?.id)
      })
      .catch((error) => {
        setLoading(false);
        setForm({...form,
          [error.response.data.errorInput]:{
            ...form[error.response.data.errorInput],
            error:true,
          }
        })
      }
      );
  };
  
    return (
      <Layout scroll={false} informacion={informacion}>
        {loading && <Loader />}
        <main>
          <BoxStyled
           sx={{
            maxWidth: '1200px',
              mx: 'auto',
           }}
          >
          <Grid 
            container 
            spacing={3}
            sx={{
              mt: 4,
              mb: 4,
              maxWidth: '100%',
              mx: 'auto',
              justifyContent: "space-around",
              alignItems: "flex-start",
              flexWrap: "wrap",
              "@media (min-width: 700px)": {
                flexWrap: "nowrap",
              },
            }}
            component="form"
            onSubmit={(e) => e.preventDefault()}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "100%",
                justifyContent: "space-around",
                alignItems: "flex-start",
                padding: "1rem",
              }}
              component="section"
            >
              <h5>DETALLES DE FACTURACIÓN</h5>
              <Divider 
                sx={{
                  padding: ".5rem 0",
                }}
              />
              <Box
                noValidate
                autoComplete="off"
                component="div"
                sx={{
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
                > 
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
                component="div"
                >
              <FormControl variant="standard" sx={{ width: '45%' }}>
                <InputLabel htmlFor="billing_first_name">Nombre</InputLabel>
                <Input 
                  type="text"
                  id="billing_first_name" 
                  name="billing_first_name" 
                  value={form.billing_first_name.value}
                  error={form.billing_first_name.error}
                  onChange={handleChange}
                 />
              </FormControl>
              <FormControl variant="standard" sx={{ width: '45%' }}>
                <InputLabel htmlFor="billing_last_name">Apellido</InputLabel>
                <Input 
                  type="text" 
                  id="billing_last_name"
                  name="billing_last_name"
                  value={form.billing_last_name.value}
                  error={form.billing_last_name.error}
                  onChange={handleChange} 
                  />
              </FormControl>
              </Box>
              <FormControl variant="standard">
                <InputLabel>Tipo de Documento</InputLabel>
                <Select
                  value={form.id_type.value}
                  error={form.id_type.error}
                  name="id_type"
                  onChange={handleChange}
                  label="id_type"
                >
                  <MenuItem value="DNI">DNI</MenuItem>
                  <MenuItem value="CUIL">CUIL</MenuItem>
                  <MenuItem value="CUIT">CUIT</MenuItem>
                  <MenuItem value="CDI">CDI</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard">
                <InputLabel htmlFor="billing_">Número de Documento</InputLabel>
              <Input 
                  type="text" 
                  id="billing_" 
                  name="billing_"  
                  error={form.billing_.error}
                  value={form.billing_.value}
                  onChange={handleChange} 
                />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel htmlFor="pais">País</InputLabel>
                <Input 
                  type="text" 
                  id="pais" 
                  name="pais" 
                  value={form.pais.value}
                  error={form.pais.error}
                  onChange={handleChange} 
                  disabled 
                />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel htmlFor="pais">Provincia</InputLabel>
                <Input 
                  type="text" 
                  id="pais" 
                  name="billing_state"
                  onChange={handleChange}
                  label="billing_state"
                  value={form.billing_state.value}
                  error={form.billing_state.error}
                  disabled 
                />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel>Localidad</InputLabel>
                <Select
                  value={form.billing_city.value}
                  error={form.billing_city.error}
                  id="billing_city"
                  name="billing_city" 
                  onChange={handleChange}
                  label="billing_city"
                >
                  <MenuItem value="Buenos Aires">Localidad 1</MenuItem>
                  <MenuItem value="CUIL">Localidad 2</MenuItem>
                  <MenuItem value="CUIT">Localidad 3</MenuItem>
                  <MenuItem value="CDI">Localidad 4</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard">
                <InputLabel>Nombre de la calle del Domicilio</InputLabel>
                <Input 
                  type="text"
                  id="billing_address_1"
                  name="billing_address_1" 
                  value={form.billing_address_1.value}
                  error={form.billing_address_1.error}
                  onChange={handleChange}
                  />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel>Numero del Domicilio</InputLabel>
                <Input 
                  type="text"
                  id="billing_address_2"
                  name="billing_address_2" 
                  value={form.billing_address_2.value}
                  error={form.billing_address_2.error}
                  onChange={handleChange}
                  />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel htmlFor="zip">Codigo Postal</InputLabel>
                <Input
                  type="text"
                  id="zip"
                  name="zip"
                  value={form.zip.value}
                  error={form.zip.error}
                  onChange={handleChange} 
                />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel htmlFor="phone">Telefono</InputLabel>
                <Input 
                  type="tel" 
                  id="phone" 
                  name="phone"  
                  value={form.phone.value}
                  error={form.phone.error}
                  onChange={handleChange} 
                />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={form.email.value}
                  error={form.email.error}
                  onChange={handleChange} 
                />
              </FormControl>
              {/* <FormControlLabel control={<Checkbox />} label="¿Crear una cuenta?" /> */}
                <TextField
                    label="Notas del pedido (opcional)"
                    multiline
                    rows={4}
                />
            </Box>
          </Box>
          <Box
              sx={{
                width: "100%",
                maxWidth: "100%",
                padding: "1rem",
              }}
              component="section"
            >
              <h5>TU PEDIDO</h5>
              <Divider
                sx={{
                  padding: ".5rem 0",
                }}
              />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell>Sub Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.cart.map((product) => 
                    <TableRow key={product.name}>
                    <TableCell>
                      <h4>{product.name} x{product.quantity}</h4>
                    </TableCell>
                    <TableCell>${product.price}</TableCell>
                  </TableRow>
                  )}
                  <TableRow>
                    <TableCell>
                      <h3>Sub Total</h3>
                    </TableCell>
                    <TableCell>{state.cart.length > 0 ? state.cart.reduce((total, product) => total + product.price * product.quantity, 0) : 0}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <h3>Envio</h3>
                    </TableCell>
                    <TableCell>$10</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <h3>Total</h3>
                    </TableCell>
                    <TableCell>{state.cart.length > 0 ? state.cart.reduce((total, product) => total + product.price * product.quantity, 0) + 10: 0}</TableCell>
                  </TableRow>
                  </TableBody>
              </Table>
              <FormControl component="fieldset">
                <FormLabel>Modo de pago</FormLabel>
                <RadioGroup
                  aria-label="pago"
                  defaultValue="mercado-pago"
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="mercado-pago" control={<Radio />} label="Comprar por mercado pago" />
                  {/* <FormControlLabel value="transferencia-bancaria" control={<Radio />} label="Comprar por transferencia bancaria" /> */}
                </RadioGroup>
              </FormControl>
              <MpCheckoutStyled>
                <div className="mp-panel-checkout">
                  <div className="mp-row-checkout">
                  <div id="framePayments" className="mp-col-md-12">
                    <div className="frame-tarjetas">
                      <p className="mp-subtitle-basic-checkout">
                        Tarjetas de crédito
                      </p>
                      <Image src="https://www.mercadopago.com/org-img/MP3/API/logos/cordobesa.gif" className="mp-img-fluid mp-img-tarjetas" alt="" layout="fill" />
                      <Image src="https://www.mercadopago.com/org-img/MP3/API/logos/naranja.gif" className="mp-img-fluid mp-img-tarjetas" alt="" objectFit="contain" layout="fill" />
                      <Image src="https://www.mercadopago.com/org-img/MP3/API/logos/tarshop.gif" className="mp-img-fluid mp-img-tarjetas" alt="" objectFit="contain" layout="fill" />
                      <Image src="https://www.mercadopago.com/org-img/MP3/API/logos/diners.gif" className="mp-img-fluid mp-img-tarjetas" alt="" objectFit="contain" layout="fill" />
                      <Image src="https://www.mercadopago.com/org-img/MP3/API/logos/visa.gif" className="mp-img-fluid mp-img-tarjetas" alt="" objectFit="contain" layout="fill" />
                      <Image src="https://www.mercadopago.com/org-img/MP3/API/logos/amex.gif" className="mp-img-fluid mp-img-tarjetas" alt="" objectFit="contain" layout="fill" />
                      <Image src="https://www.mercadopago.com/org-img/MP3/API/logos/master.gif" className="mp-img-fluid mp-img-tarjetas" alt="" objectFit="contain" layout="fill" />
                      <Image src="https://www.mercadopago.com/org-img/MP3/API/logos/argencard.gif" className="mp-img-fluid mp-img-tarjetas" alt="" objectFit="contain" layout="fill" />
                      <Image src="https://www.mercadopago.com/org-img/MP3/API/logos/cmr.gif" className="mp-img-fluid mp-img-tarjetas" alt="" objectFit="contain" layout="fill" />
                      <Image src="https://www.mercadopago.com/org-img/MP3/API/logos/cabal.gif" className="mp-img-fluid mp-img-tarjetas" alt="" objectFit="contain" layout="fill" />
                      <Image src="https://www.mercadopago.com/org-img/MP3/API/logos/cencosud.gif" className="mp-img-fluid mp-img-tarjetas" alt="" objectFit="contain" layout="fill" />
                    </div>
                  </div>
                  <div id="framePayments" className="mp-col-md-6 mp-pr-15">
                  <div className="frame-tarjetas">
                    <p className="submp-title-checkout">Tarjetas de débito</p>
                    <Image src="https://www.mercadopago.com/org-img/MP3/API/logos/debcabal.gif" className="mp-img-fluid mp-img-tarjetas" alt=""  objectFit="contain" layout="fill" />
                    <Image src="https://www.mercadopago.com/org-img/MP3/API/logos/debvisa.gif" className="mp-img-fluid mp-img-tarjetas" alt=""  objectFit="contain" layout="fill" />                                                                                                            
                    <Image src="https://www.mercadopago.com/org-img/MP3/API/logos/maestro.gif" className="mp-img-fluid mp-img-tarjetas" alt=""  objectFit="contain" layout="fill" />
                    <Image src="https://www.mercadopago.com/org-img/MP3/API/logos/debmaster.gif" className="mp-img-fluid mp-img-tarjetas" alt=""  objectFit="contain" layout="fill" />
                  </div>
                </div>       
                <div className="mp-col-md-12 mp-pt-20">
                  <div className="mp-redirect-frame">
                    <div className="mp-redirect-frame-img">
                      <Image src="https://stallionorganicos.com/wp-content/plugins/woocommerce-mercadopago/includes/../assets/images/redirect_checkout.png" className="mp-img-fluid mp-img-redirect" alt="" objectFit="contain" layout="fill" />
                    </div>
                    <p>Te llevamos a nuestro sitio para completar el pago</p>
                  </div>
                </div>
                </div>
              </div>
              <div>       
                <p className="mp-terms-and-conditions"> 
                  Al continuar, aceptas nuestros  		
                  <a target="_blank" rel="noreferrer" href="https://www.mercadopago.com.ar/ayuda/terminos-y-politicas_194">  Términos y Condiciones </a>
                </p> 		
              </div>
              </MpCheckoutStyled>
                <p>
                Tus datos personales se utilizarán para procesar tu pedido, mejorar tu experiencia en esta web y otros propósitos descritos en nuestra Política de Privacidad.
                </p>
              <FormControlLabel className="check-polite" control={<Checkbox />} label="Acepto los términos y condiciones de la Política de Privacidad" />
              <Button
                  variant="contained"
                  type="submit" 
                  onClick={handleSubmit}
                >Realizar Pedido</Button>
            </Box>
          </Grid>
          </BoxStyled>
        </main>
      </Layout>
    );
    
}

export const getStaticProps = async () => {
  const queryinformacion = groq`
  *[_type == "informacion"] | order(_createdAt asc)[0]
  `
  const informacion = await sanity.fetch(queryinformacion)

  return { props:{ informacion } }
}  

export default Checkout;

       // preference:{
        //   notification_url: 'https://e-commerce-demo-kappa.vercel.app/api/send-email',
        //   auto_return: 'approved',
        //   payment_methods: { installments: 1 },
        //   shipments: { cost: 10, mode: 'not_specified' },
        //   back_urls: {
        //     success: 'https://e-commerce-demo-kappa.vercel.app/success',
        //     failure: 'https://e-commerce-demo-kappa.vercel.app/failure'
        //   },
        //   items: [
        //     {
        //       id: '882feb75-ffac-4ad7-8235-1e3598fe3b03',
        //       title: 'Compost Orgánico',
        //       description: 'item.description',
        //       picture_url: 'https://cdn.sanity.io/images/5df2j7ty/production/4fc6ce5b6b5ded3c7f8f0dd5daebff7285c19817-300x300.jpg?w=400&h=400',
        //       category_id: 'item.category',
        //       quantity: 5,
        //       unit_price: 205
        //     },
        //     {
        //       id: '6bbd1425-2fb4-45aa-8db2-090e4d4bc540',
        //       title: 'Huerta 3',
        //       description: 'item.description',
        //       picture_url: 'https://cdn.sanity.io/images/5df2j7ty/production/2ebfd62f4a012146f94cc28b0dfc4936b3a50ebc-768x1024.jpg?rect=0,128,768,768&w=400&h=400',
        //       category_id: 'item.category',
        //       quantity: 13,
        //       unit_price: 434
        //     }
        //   ],
        //   payer: {
        //     address: { zip_code: '1728', street_name: 'Mentirota', street_number: 3132 },
        //     date_created: null,
        //     email: 'test_user_82617814@testuser.com',
        //     last_purchase: null,
        //     name: 'ASIESghj',
        //     surname: 'Vbbjkkhb',
        //     first_name: 'ASIESghj',
        //     last_name: 'Vbbjkkhb',
        //     identification: { type: 'DNI', number: '54353454' }
        //   },
        //   metadata: {
        //     name: 'ASIESghj',
        //     last_name: 'Vbbjkkhb',
        //     email: 'test_user_82617814@testuser.com',
        //     billing_state: 'Buenos Aires',
        //     billing_: '54353454',
        //     billing_address_1: 'Mentirota',
        //     billing_address_2: '3132',
        //     phone: '01123434345',
        //     pais: 'Argentina',
        //     city: 'Buenos Aires',
        //     id_type: 'DNI'
        //   }
        // }

                // alert("entro")
        // alert(`
        // ${result?.items?.map(item=>`
        // Producto
        //     id: ${item?.id},
        //     title: ${item?.title},
        //     description: ${item?.description},
        //     picture_url: ${item?.picture_url},
        //     category_id: ${item?.category_id},
        //     quantity: ${item?.quantity},
        //     unit_price: ${item?.unit_price}
        // `)}  
        // `)
        // alert(`
        // preference payer 
        // address: 
        //   zip_code: ${result?.payer?.address?.zip_code},
        //   street_name: ${result?.payer?.address?.street_name},
        //   street_number: ${result?.payer?.address?.street_number}
        // ,
        // date_created: ${result?.payer?.date_created},
        // email: ${result?.payer?.email},
        // last_purchase: ${result?.payer?.last_purchase},
        // name: ${result?.payer?.name},
        // surname:${result?.payer?.surname},
        // first_name: ${result?.payer?.first_name},
        // last_name: ${result?.payer?.last_name},
        // identification: 
        //   type: ${result?.payer?.identification?.type},
        //   number: ${result?.payer?.identification?.number},    
        // `)

    // axios
    //   .post("/api/send-email",
    //   {
    //     data:{
    //       id:18044560008
    //     }
    //   }
    //   ).then(result => {
    //     console.log(result)
    //   })