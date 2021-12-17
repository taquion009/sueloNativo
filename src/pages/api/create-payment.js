import { configure, preferences } from 'mercadopago';
import imageUrlBuilder from '@sanity/image-url'
import { sanity } from '../../lib/client'
import validateForm from '../../helpers/validateFrom';
import groq from 'groq'

function configureMercadoPagoSDK() {
  configure({
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
  return preferences.create({
    "notification_url": "https://suelo-nativo.vercel.app/api/send-email",
    "auto_return": "approved",
    "payment_methods": {
        "installments": 1,
        "excluded_payment_types": [
            {
                "id": "ticket"
            }
        ]
    },
    "external_reference": "MP0001",
    "back_urls": {
        "success": "https://suelo-nativo.vercel.app/success",
        "failure": "https://suelo-nativo.vercel.app/failure",
        "pending": "https://suelo-nativo.vercel.app/pending"
    },
    "items": [
        {
            "id": "04aceccc-db24-4f05-8190-1862fb51bee6",
            "title": "Ejemplo de producto 3",
            "description": "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. “",
            "picture_url": "https://cdn.sanity.io/images/miwyqf25/production/2c3faf8e3c7f125dd02dd64f659ff93648d44749-2552x1880.png?rect=336,0,1880,1880&w=400&h=400",
            "category_id": "producto",
            "quantity": 1,
            "unit_price": 300
        }
    ],
    "payer": {
        "address": {
            "zip_code": "1728",
            "street_name": "Mentirota",
            "street_number": 31365
        },
        "date_created": null,
        "email": "test_35325@testuser.com",
        "last_purchase": null,
        "name": "ASIESghj",
        "surname": "Vbbjkkhb",
        "first_name": "ASIESghj",
        "last_name": "Vbbjkkhb",
        "identification": {
            "type": "DNI",
            "number": "54353454"
        }
    },
    "metadata": {
        "name": "ASIESghj",
        "last_name": "Vbbjkkhb",
        "email": "rmilesi009@gmail.com",
        "billing_state": "Buenos Aires",
        "billing_": "54353454",
        "billing_address_1": "Mentirota",
        "billing_address_2": "31365",
        "phone": "01123434345",
        "pais": "Argentina",
        "city": "CARHUE",
        "id_type": "DNI"
    }
})
  .then((data)=> res.status(200).json({data,preference}))
  .catch((err)=> res.status(404).json(err))
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