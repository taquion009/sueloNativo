import { configure, preferences } from 'mercadopago';
import imageUrlBuilder from '@sanity/image-url'
import { sanity } from '../../lib/client'
import validateForm from '../../helpers/validateFrom';

function configureMercadoPagoSDK() {
  configure({
    // sandbox: process.env.useMercadoPagoSandbox === 'true',
    integrator_id:"dev_24c65fb163bf11ea96500242ac130004",
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
  // "shipments": {
  //   "receiver_address": {
  //     "zip_code": "12312-123",
  //     "state_name": "Rio de Janeiro",
  //     "city_name": "Buzios",
  //     "street_name": "Av das Nacoes Unidas",
  //     "street_number": 3003
  //   },
  //   entity_type: "individual",
  //   type: "customer",
  // },
  "payment_methods": {
    "installments": 1
  },
  "shipments":{
    "cost": 10,
    "mode": "not_specified",
  },
  // "barcode": {},
  // description: "Payment for product",
  external_reference: "MP0001",
  // installments: 1,
  // order: {
  //   type: "mercadolibre"
  // },
  // payment_method_id: "visa",
  // transaction_amount: 58.8,
  back_urls: {
      success: 'https://suelo-nativo.vercel.app/success',
      failure: 'https://suelo-nativo.vercel.app/failure',
      pending: 'https://suelo-nativo.vercel.app/pending'
    },
};

const createPayment = async (req, res) => {
  for(let name in req.body.form) {
    if(validateForm(name, req.body.form[name])) {
      res.status(400).json({
        errorInput: name,
      });
    }
  };

  configureMercadoPagoSDK()

  preference.items = await req.body.store.map(item => {
    return {
      id: item._id,
      title: item.name,
      description: "item.description",
      picture_url: `${urlFor(item.image).width(400).height(400).url()}`,
      category_id: "item.category",
      quantity: item.quantity,
      unit_price: item.price,
    }
  })
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

  preference.metadata = {
    name: req.body.form.billing_first_name,
    last_name: req.body.form.billing_last_name,
    email: req.body.form.email,
    billing_state: req.body.form.billing_state,
    billing_: req.body.form.billing_,
    billing_address_1: req.body.form.billing_address_1,
    billing_address_2: req.body.form.billing_address_2,
    phone: req.body.form.phone,
    pais: 'Argentina',
    city: req.body.form.billing_city,
    id_type: req.body.form.id_type,
  }
  return preferences.create(preference)
  .then((data)=> res.json({data:data}))
  .catch((err)=> res.json(err))
};

export default createPayment

// {
//   notification_url: 'https://e-commerce-demo-kappa.vercel.app/api/send-email',
//   auto_return: 'approved',
//   back_urls: {
//     success: 'https://e-commerce-demo-kappa.vercel.app/success',
//     failure: 'https://e-commerce-demo-kappa.vercel.app/failure',
//     pending: 'https://e-commerce-demo-kappa.vercel.app/pending'
//   },
//   items: [
//     {
//       id: '1234',
//       title: 'Nombre del producto seleccionado del carrito del ejercicio',
//       description: '“Dispositivo móvil de Tienda e-commerce”',
//       picture_url: 'https://cdn.sanity.io/images/5df2j7ty/production/4fc6ce5b6b5ded3c7f8f0dd5daebff7285c19817-300x300.jpg?w=400&h=400',
//       category_id: 'item.category',
//       quantity: 1,
//       unit_price: 205
//     },
//   ],
//   external_reference: "loli009master@gmail.com",
//   payer: {
//     address: { zip_code: '1111', street_name: 'Falsa', street_number: 123 },
//     date_created: null,
//     email: 'test_user_63274575@testuser.com',
//     last_purchase: null,
//     name: 'Lalo',
//     surname: 'Landa',
//     first_name: 'Lalo',
//     last_name: 'Landa',
//     phone: {
//       area_code: "11",
//       number: 22223333
//     },
//     identification: { type: 'DNI', number: '54353454' }
//   },
//   payment_methods: {
//     installments: 6,
//     excluded_payment_methods: [
//       {
//         id: 'amex',
//       }
//     ],
//     excluded_payment_types: [
//       {
//         id: 'atm',
//       }
//     ],
//   }
// }