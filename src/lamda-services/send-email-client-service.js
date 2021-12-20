import nodemailer from 'nodemailer';

export const sendEmailClient = async ( fromEmail, data ) => {
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
          to: "rmilesi009@gmail.com",
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
              <h3>Detalles de la compra</h3>
              <ul>
                  ${data?.metadata?.items.map(item => `
                      <li>
                        <h3>${item?.title}</h3>
                        <img src=${item?.picture_url} style="max-width:100%">
                        <p>cantidad: ${item?.quantity}</p>
                        <p>precio: ${item?.unit_price}</p>
                        <p>descripcion: ${item?.description}</p>
                      </li>
                    `)}
                </ul>
              <h3>Envio</h3>
              <p>El metado elegido fue: ${data?.metadata?.send_client}</p>
              <h3>Total</h3>
              <p>${data?.transaction_amount}</p>
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
