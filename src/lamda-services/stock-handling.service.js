import { sanity } from '../lib/client';
import groq from 'groq'

export const updateSanityStock = async (req, res) => {
  const { SendClient } = req.body
  const idProducto = SendClient.map(item => `"${item.id}"`).join('|| _id ==');
  
  const queryProducts = groq`
    *[_type == "producto" && (_id == ${idProducto})]{_id, stock}
  `
  const products = await sanity.fetch(queryProducts)

   const patches = products.map((item) => {
      return {
        patch: {
            id: item._id,
            dec: { stock: SendClient.find(itemC => itemC.id === item._id).quantity }
        },
    }})

  sanity.transaction(patches).commit().then(()=>{
    res.json({
      message: 'Se actualizo el stock'
    })
  })
  .catch(error => {
    res.json({
      message: 'No se pudo actualizar el stock'
    })
  })
};
