import { sendEmail } from '../../lamda-services/send-email-contact-service';
// import axios from 'axios';

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
        message: "Hace falta uno o más campos",
      });
    }

    // try {
    //   const response = await axios.post(
    //     `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
    //     {
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    //       },
    //     }
    //   )

    //   if (!response.success) {
    //     return res.status(422).json({
    //       message: "Unproccesable request, Invalid captcha code",
    //       captcha
    //     });
    //   }
    // } catch (error) {
    //   return res.status(422).json({ message: "Something went wrong"});
    // }
  
  const result = await sendEmail("loli009master@gmail.com", req.body.email, req.body.message, req.body.billing_first_name);
  return res.status(200).send(result);
};

export default send