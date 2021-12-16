import { sendEmail } from '../../lamda-services/send-email-contact-service';

const send = async (req, res) => {
  if (req.method !== 'POST') 
    return res.status(404).json({
      error: {
        code: 'not_found',
        message: "ErrorMessages.EndpointMethodIncorrect",
      },
    });
  
  const result = await sendEmail("loli009master@gmail.com", req.body.email, req.body.message, req.body.billing_first_name);

  return res.status(200).send(result);
};

export default send