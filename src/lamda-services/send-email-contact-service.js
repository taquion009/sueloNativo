import nodemailer from 'nodemailer';

export const sendEmail = async (toEmail, fromEmail, dataMessage, name ) => {
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
              from: fromEmail,
              headers: {
                  'X-Laziness-level': 1000
              }
          }
      );
  
      let message = {
          to: toEmail,
          subject: `${name} quiere contactarse contigo`,
          html: `<!doctype html>
          <html ⚡4email>
            <head>
              <meta charset="utf-8">
              <style amp4email-boilerplate>body{color:#333333}</style>
              <script async src="https://cdn.ampproject.org/v0.js"></script>
              <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
            </head>
            <body>
              <h2>Nombre del contacto: ${name}</h2>
              <p>Mensaje: ${dataMessage}</p>
              <p>Email: ${toEmail}</p>
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
