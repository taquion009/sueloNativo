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

  let id = req.query['data.id'] || req.body?.data?.id || req.body?.id

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
  
  const SendClient = await axios.post("/api/update-stock", {
    send_client: data.metadata.items.map((item) =>{return {id:item.id, quantity:item.quantity}}),
  }).then((data) => {
    return data.data.message
  })

  data.metadata.send_client = await SendClient

  const result = await sendEmail(process.env.EMAIL_SEND, data);
  
  return res.status(200).send(result);
};

export default send