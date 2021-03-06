// import { pipe } from 'fp-ts/lib/pipeable';
// import { map } from 'fp-ts/lib/TaskEither';
// import { createPreference } from './mercadopago.service';

// export const createPaymentLink = (data) => {
//   const items = data.map((item) => {
//     return {
//       title: item.name,
//       description: item.description,
//       quantity: item.quantity,
//       unit_price: item.price,
//       picture_url: item.pictureUrl,
//       currency_id: 'ARS',
//     }
//   });

//   const { url } = process.env;

//   const paymentObject = {
//     items,
//     notification_url: `${url}/api/update-stock`,
//     back_urls: {
//       success: `${url}/purchase-confirm`,
//     },
//     auto_return: 'approved',
//     external_reference: JSON.stringify(
//       data.map((x) => {
//         return { id: x.id, size: x.size, quantity: x.quantity };
//       })
//     ),
//   };

//   return pipe(
//     createPreference(paymentObject),
//     map((result) =>
//       process.env.useMercadoPagoSandbox === 'true' ? result.response.sandbox_init_point : result.response.init_point
//     )
//   );
// };
