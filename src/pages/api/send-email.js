import { sendEmail } from '../../lamda-services/send-email.service';
import axios from 'axios'

const send = async (req, res) => {
  if (req.method !== 'POST') 
    return res.status(404).json({
      error: {
        code: 'not_found',
        message: "ErrorMessages.EndpointMethodIncorrect",
      },
    });
  
  let id = req.body.data.id || req.body.id

  let data = await axios
    .get(`https://api.mercadopago.com/v1/payments/${id}`,{
      headers: {
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
      },
    })
    .then(function (response) {
      const { data } = response;
      return data;
    })
    .catch(function (error) {
      return res.status(404).json({
        error: {
          code: 'not_found',
          message: ErrorMessages.EndpointMethodIncorrect,
        },
      });
    });

  const result = await sendEmail({ email:process.env.EMAIL_SEND, data });

  return res.status(200).send(result);
};

export default send