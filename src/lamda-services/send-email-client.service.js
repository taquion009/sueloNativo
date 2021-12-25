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
                <img src="https://suelo-nativo.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.1ab53d11.svg&w=64&q=75" width="64px" height="64px" alt="Suele Nativo" />
                <h2>Muchas gracias por tu compra</h2>
              </header>
              <p>Ahora por favor esperanos hasta que nos comuniquemos con usted para coordinar la entrega de su pedido.</p>
              <p>Numero de pedido: <strong>${data?.id}</strong></p>
              <p>Cualquier duda o comentario no dude en contactarnos. <a href="https://suelonativo.com.ar">suelonativo.com.ar</a></p>
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
              <p>El metodo elegido fue: ${data?.metadata?.envio}</p>
              <h3>Total</h3>
              <p>Pago: $${data?.transaction_amount}</p>
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
