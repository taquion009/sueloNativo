import nodemailer from 'nodemailer';

export const sendEmailLlego = async (email, data ) => {
  const sendMailPromise = () => {
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        logger: true,
        transactionLog: true
      },
      {
              from: 'rmilesi009@gmail.com',
              headers: {
                  'X-Laziness-level': 1000
              }
          }
      );
  
      let message = {
          to: email,
          subject: `Compra realizada con éxito por ${data.metadata?.name}`,
          html: `<!doctype html>
          <html ⚡4email>
            <head>
              <meta charset="utf-8">
              <style amp4email-boilerplate>body{color:#333333}</style>
              <script async src="https://cdn.ampproject.org/v0.js"></script>
              <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
            </head>
            <body>
              <h1>LLego</h1>
            </body>
          </html>`,
      };
      return new Promise((resolve, reject) => {
      transporter.sendMail(message, (error, info) => {
        return error ? reject(error) : resolve(info);
  });
});
};
  return sendMailPromise();
};
