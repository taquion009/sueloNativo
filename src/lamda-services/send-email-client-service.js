import nodemailer from 'nodemailer';

export const sendEmailClient = async (toEmail, fromEmail, data ) => {
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
          subject: `Muchas gracias por tu compra - Suelo Nativo`,
          html: `<!doctype html>
          <html ⚡4email>
            <head>
              <meta charset="utf-8">
              <style amp4email-boilerplate></style>
              <script async src="https://cdn.ampproject.org/v0.js"></script>
              <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
            </head>
            <body>
            <header>
              <img src="https://ci6.googleusercontent.com/proxy/OPa_DiAN7EdlTnyf-1mI2HKdDf3UgXvoyzALGQTmubRx1efhZ_kQchA8AQ2WQDehiuMfuxNFpr8cWVs1_EzL9gS96pfj4XNjEv-GSSCVyediewuGefaUN45ZdKfPGXVbTB3Hbs_Joiq2NziWCo4dvpLJqj7Poy9SMORl=s0-d-e1-ft#https://s3-sa-east-1.amazonaws.com/contenido.general.entradauno/imagenes/Clientes/Atlas/logo_header1.png" alt="Suele Nativo" />
              <h2>Muchas gracias por tu compra</h2>
            </header>
            ${data}
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
