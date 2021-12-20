import { sanity } from '../../lib/client'
import groq from 'groq'

export default async function getStock(req, res){
    const { _id } = req.body
    const query = groq`
    *[_type == "producto" && _id == "${_id}"][0]{stock}
  `
  const data = await sanity.fetch(query)
  res.json(data)
};