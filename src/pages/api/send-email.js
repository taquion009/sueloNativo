import { sendEmail } from '../../lamda-services/send-email.service';
import { sendEmailClient } from '../../lamda-services/send-email-client.service';
import axios from 'axios'

const send = async (req, res) => {
  if (req.method !== 'POST') 
    return res.status(404).json({
      error: {
        code: 'not_found',
        message: "ErrorMessages.EndpointMethodIncorrect",
      },
    });

  if(req.query['type'] !== "payment"){
    return res.status(404).json({
      message: 'No se encontraron productos'
    })
  }

  let id = req.body?.data?.id || req.body?.id || req.query['data.id']

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
      return  error
    });
  
  const SendClient = await axios.post(`https://${process.env.DOMAIN_NAME}/api/update-stock`, {
    send_client: data?.metadata?.items.map((item) =>{return {id:item.id, quantity:item.quantity}}),
  }).then((data) => {
    return data.data.message
  })

  data.metadata.send_client = SendClient

  const result2 = await sendEmailClient(process.env.EMAIL_SEND, data)

  const result = await sendEmail(process.env.EMAIL_SEND, {...data})
  
  return res.status(200).send(result);
};

export default send