import { configure, preferences, payment } from 'mercadopago';

// export function configureMercadoPagoSDK() {
//   configure({
//     sandbox: process.env.useMercadoPagoSandbox === 'true',
//     access_token: process.env.mercadoPagoAccessToken,
//   });
// }

// export const createPreference = data => {
//   return preferences.create(data)
//   .then((res)=>console.log(res))
//   .catch((err)=>console.log(err))
// };
export const getPayment = (paymentId) => payment.get(paymentId);
