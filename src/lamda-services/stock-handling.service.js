import { sanity } from '../lib/client';
import groq from 'groq'

export const updateSanityStock = async (send_client) => {
  const idProducto = send_client.map(item => `"${item.id}"`).join('|| _id ==');
  
  const queryProducts = groq`
    *[_type == "producto" && (_id == ${idProducto})]{_id, stock}
  `
  const products = await sanity.fetch(queryProducts)

   const patches = products.map((item) => {
      return {
        patch: {
            id: item._id,
            dec: { stock: send_client.find(itemC => itemC.id === item._id).quantity }
        },
    }})
  let message = sanity.transaction(patches).commit().then(()=>{
    return'Se actualizo el stock'
  })
  .catch(error => {
    return'No se pudo actualizar el stock'
  })
  return message
};
