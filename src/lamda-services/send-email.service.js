import nodemailer from 'nodemailer';

export const sendEmail = async (email, data ) => {
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
              <h1>Compra realizada</h1>
              <p>por ${data?.metadata?.name + " " + data?.metadata?.last_name} <${data?.metadata?.email} > <br/> ${data?.date_approved}hs</p>
              <p>id de compra: ${data?.id}</p>
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
              <p>Stock: ${data?.metadata?.send_client}</p>
              <h2>Informacion del cliente</h2>
              <p>Nombre: ${data.metadata?.name} ${data?.metadata?.last_name}</p>
              <p>Email: ${data?.metadata?.email}</p>
              <p>Numeros de telefono: ${data?.metadata?.phone}</p>
              <p>Identificacion: ${data?.metadata?.id_type} - ${data?.metadata?.billing_}</p>
              <h2>Informacion de envio</h2>
              <p>Metodo de envio: ${data?.metadata?.envio}</p>
              <p>Provincia: ${data?.metadata?.billing_state}</p>
              <p>Localidad / Ciudad: ${data?.metadata?.city}</p>
              <p>Domicilio: ${data?.metadata?.billing_address_1} ${data?.metadata?.billing_address_2}</p>
              <p>Codigo postal: ${data?.metadata?.payer?.address?.zip_code}</p>
              <p>Información adicional: ${data?.metadata?.info_adicional}</p>
              <h2>Informacion del pago</h2>
              <h3>Cobro: ${data?.transaction_amount}</h3>
              <h3>Cargo de Mercado Pago: ${data?.fee_details.map(item => item?.amount).reduce((a, b) => a + b)}</h3>
              <h3>Total: ${data?.transaction_details?.net_received_amount}</h3>
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
  