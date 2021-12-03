import React from 'react';
import Layout from '../components/Layout';
import styled from '@emotion/styled';

const ContainerStyled = styled.div`
    max-width: 90%;
    margin: 0 auto;
    & p, & h2, & hr{
      margin-bottom: 1rem;
    }
`

const Politicadeprivacidad = () => {
  return (
    <Layout scroll={false}>
      <main style={{padding:"1em", minHeight: "500px"}}>
        <ContainerStyled itemProp="text">
          <h2>Política de Privacidad</h2>
          <hr className="wp-block-separator" />
          <p>SECCIÓN 1 – ¿QUÉ HACEMOS CON TU INFORMACIÓN?</p>
          <p>Cuando compras algo de nuestra tienda, como parte del proceso de compra venta, nosotros recolectamos la información personal que nos das tales como: nombre, documento, dirección y correo electrónico.</p>
          <p>Cuando navegas en nuestra tienda, también recibimos de manera automática la dirección de protocolo de Internet de tu computadora (IP) con el fin de proporcionarnos información que nos ayuda a conocer acerca de tu navegador y sistema operativo.</p>
          <p>Email marketing: Con tu permiso, vamos a poder enviarte correos electrónicos sobre nuestra tienda, nuevos productos y otras actualizaciones.</p>
          <p>SECCIÓN 2 – CONSENTIMIENTO</p>
          <p>¿Cómo obtienen mi consentimiento?</p>
          <p>Cuando nos provees tu información personal para completar una transacción, verificar tu tarjeta de crédito, crear una órden,  concertar un envío o hacer una devolución, implicamos que aceptas la recolección y uso por esa razón específica solamente.</p>
          <p>Si te pedimos tu información personal por una razón secundaria, como marketing, te vamos a pedir directamente tu expreso consentimiento, o te vamos a dar la oportunidad de negarte.</p>
          <p>¿Cómo puedo anular mi consentimiento?</p>
          <p>Si después de haber aceptado cambias de opinión, podes anular tu consentimiento para que te contactemos, por la recolección, uso o divulgación de tu información, en cualquier momento, contactándonos a info@stallionorganicos.com.</p>
          <p>SECCIÓN 3 – DIVULGACIÓN</p>
          <p>Podemos divulgar tu información personal si se nos requiere por ley o si violas nuestros <a href="https://stallionorganicos.com/terminos-y-condiciones/" target="_blank" rel="noreferrer noopener" aria-label="Términos y Condiciones (opens in a new tab)">Términos y Condiciones</a>.</p>
          <p>SECCIÓN 4 – WORDPRESS</p>
          <p>Nuestra tienda se encuentra alojada en WordPress. Ellos nos proporcionan la plataforma de ecommerce que nos permite venderte nuestros productos. Tus datos se almacenan en un servidor seguro detrás de un firewall.</p>
          <p>SECCIÓN 5 – SERVICIOS TERCERIZADOS</p>
          <p>En general, los proveedores de terceras partes utilizados por nosotros solo recopilarán, usarán y divulgarán tu información en la medida que sea necesaria para que les permita desempeñar los servicios que nos proveen.</p>
          <p>Sin embargo, algunos proveedores de servicios tercerizados, tales como pasarelas de pago y otros procesadores de transacciones de pago, tienen sus propias políticas de privacidad con respecto a la información que estamos obligados a proporcionarles para las transacciones relacionadas con las compras.</p>
          <p>Para estos proveedores, te recomendamos que leas las políticas de privacidad para que puedas entender la manera en que tu información personal será manejada.</p>
          <p>Una vez que abandonas el sitio web de nuestra tienda o te redirigís a un sitio o aplicación de terceros, ya no estás siendo regulado por la presente Política de Privacidad o los <a href="https://stallionorganicos.com/terminos-y-condiciones/" target="_blank" rel="noreferrer noopener" aria-label="Términos y Condiciones (opens in a new tab)">Términos y Condiciones</a> de nuestra página web.</p>
          <p>Enlaces</p>
          <p>Cuando haces clic en enlaces de nuestra tienda, puede que seas redirigido fuera de nuestra web.  No somos responsables por las prácticas de privacidad de otros sitios y te recomendamos leer sus normas de privacidad.</p>
          <p>SECCIÓN 6 – SEGURIDAD</p>
          <p>Para proteger tu información personal, tomamos precauciones razonables y seguimos las mejores prácticas de la industria para asegurarnos de que no haya pérdida de manera inapropiada, mal uso, acceso, divulgación, alteración o destrucción de la misma.</p>
          <p>SI nos proporcionas la información de tu tarjeta de crédito, dicha información es encriptada mediante la tecnología Secure Socket Layer (SSL) y se almacena con un cifrado AES-256.  Aunque ningún método de transmisión a través de Internet o de almacenamiento electrónico es 100% seguro, seguimos todos los requisitos de PCI-DSS e implementamos normas adicionales aceptadas por la industria.</p>
          <p>SECCIÓN 7 – EDAD DE CONSENTIMIENTO</p>
          <p>Al utilizar este sitio, declaras que tenes al menos la mayoría de edad en tu país, o que tenes la mayoría de edad en tu país y nos diste tu consentimiento para permitir que cualquiera de tus dependientes menores use este sitio.</p>
          <p>SECCIÓN 8 – CAMBIOS A ESTA POLÍTICA DE PRIVACIDAD</p>
          <p>Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento, así que por favor revisala frecuentemente.  Cambios y aclaraciones van a entrar en vigencia inmediatamente después de su publicación en el sitio web.  Si hacemos cambios materiales a esta política, vamos a notificar que ha sido actualizada, por lo que cual vas a enterarte de qué información recopilamos, cómo y bajo qué circunstancias, si las hubiere, la utilizamos y/o divulgamos.</p>
          <p>Si nuestra tienda es adquirida o fusionada con otra empresa, tu información puede ser transferida a los nuevos propietarios.</p>
          <p>PREGUNTAS E INFORMACIÓN DE CONTACTO</p>
          <p>Si queres: acceder, corregir, enmendar o borrar cualquier información personal que poseamos sobre vos, registrar una queja, o simplemente queres más información contactanos a info@stallionorganicos.com.</p>
          <hr className="wp-block-separator" />
        </ContainerStyled>
      </main>
    </Layout>
  );
};

export default Politicadeprivacidad;
