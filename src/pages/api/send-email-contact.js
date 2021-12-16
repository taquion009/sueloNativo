import { sendEmail } from '../../lamda-services/send-email-contact-service';
import axios from 'axios';

const send = async (req, res) => {
  if (req.method !== 'POST') 
    return res.status(404).json({
      error: {
        code: 'not_found',
        message: "ErrorMessages.EndpointMethodIncorrect",
      },
    });

    const { email, captcha, billing_first_name, message } = req.body;

    if (!email || !captcha || !billing_first_name || !message) {
      return res.status(422).json({
        message: "Unproccesable request, please provide the required fields",
      });
    }

    try {
      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`
      )

      // if (!captchaValidation.success) {
        return res.status(400).json({
          message: "Unproccesable request, Invalid captcha code",
          x: response,
        });
      // }
    } catch (error) {
      return res.status(500).json({error, captcha});
    }
  
  const result = await sendEmail("loli009master@gmail.com", req.body.email, req.body.message, req.body.billing_first_name);
  return res.status(200).send(result);
};

export default send