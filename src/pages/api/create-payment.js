import { configure, preferences } from 'mercadopago';
import imageUrlBuilder from '@sanity/image-url'
import { sanity } from '../../lib/client'
import validateForm from '../../helpers/validateFrom';
import groq from 'groq'

function configureMercadoPagoSDK() {
  configure({
    integrator_id:process.env.MERCADOPAGO_INTEGRATOR_ID,
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
  });
}

function urlFor (source) {
  return imageUrlBuilder(sanity).image(source)
}

//vendedor
// {
//   "id": 1011458536,
//   "nickname": "TETE1691632",
//   "password": "qatest6158",
//   "site_status": "active",
//   "email": "test_user_77359016@testuser.com"
// }

//cliente
// {
//   "id": 1011483207,
//   "nickname": "TESTSAUJEXYV",
//   "password": "qatest5778",
//   "site_status": "active",
//   "email": "test_user_82617814@testuser.com"
//3711 803032 57522
//1125
//	1234
// }

let preference = {
  "notification_url":"https://suelo-nativo.vercel.app/api/send-email",
  "auto_return":"approved",
  "payment_methods": {
    "installments": 1
  },
  external_reference: "MP0001",
  payment_methods: {
    installments: 1,
    excluded_payment_types: [
      {
        id: 'ticket',
      }
    ],
  },
  back_urls: {
      success: 'https://suelo-nativo.vercel.app/success',
      failure: 'https://suelo-nativo.vercel.app/failure',
      pending: 'https://suelo-nativo.vercel.app/pending'
    },
};

const validar = (form) => {
    for(let name in form) {
    if(validateForm(name, form[name])) {
      return name;
    }
  };
  return false;
}

const getItems = (products, store) => {
  const items = []

  for(let i = 0; i < products.length; i++) {
    items.push({
      id: products[i]._id,
      title: products[i].tituloDelProducto,
      description: `“${products[i].descripcionBreve}“`,
      picture_url: `${urlFor(products[i].images[0]).width(400).height(400).url()}`,
      category_id: products[i]._type,
      quantity: Number(store[i].quantity),
      unit_price: Number(products[i].priceNow),
    })
  }

  return items
}

const createPayment = async (req, res) => {
  const valido = await validar(req.body.form);
  
  if(valido !== false) {
    return res.status(400).json({
      errorInput: valido,
      focus: true
    });
  }

  const idProducto = req.body.store.map(item => `"${item._id}"`).join('|| _id ==');
  
  const queryProducts = groq`
    *[_type == "producto" && (_id == ${idProducto})] | order(_createdAt asc)
  `
  const products = await sanity.fetch(queryProducts)

  if(products.length === 0) {
   return res.status(404).json({
      message: 'No se encontraron productos'
  })
  }

  configureMercadoPagoSDK()

  preference.items = await getItems(products, req.body.store)

  preference.payer = {
    address: {
      zip_code: req.body.form.zip,
      street_name: req.body.form.billing_address_1,
      street_number: Number(req.body.form.billing_address_2),
    },
    date_created: null,
    email: req.body.form.email,
    last_purchase: null,
    name: req.body.form.billing_first_name,
    surname:req.body.form.billing_last_name,
    first_name: req.body.form.billing_first_name,
    last_name:req.body.form.billing_last_name,
    identification: {
      type: req.body.form.id_type,
      number: req.body.form.billing_,
    }
  }

  preference.metadata = await {
    name: req.body.form.billing_first_name,
    last_name: req.body.form.billing_last_name,
    email: req.body.form.email,
    billing_state: req.body.form.billing_state,
    billing_: req.body.form.billing_,
    billing_address_1: req.body.form.billing_address_1,
    billing_address_2: req.body.form.billing_address_2,
    phone: req.body.form.phone,
    pais: 'Argentina',
    info_adicional: req.body.form.infoAdicional,
    envio: req.body.form.envio,
    city: req.body.form.billing_city,
    id_type: req.body.form.id_type,
    items: getItems(products, req.body.store),
    payer: {address:{zip_code:req.body.form.zip}}
  }

  return preferences.create(preference)
  .then((data)=> res.json({data}))
  .catch((err)=> res.json(err))
};

export default createPayment