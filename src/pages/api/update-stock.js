import { updateSanityStock } from '../../lamda-services/stock-handling.service';

export default async function update(req, res){
  if (req.method !== 'POST')
    res.status(404).json({
      error: {
        code: 'not_found',
        message: "ErrorMessages.EndpointMethodIncorrect,"
      },
    });
    const send_client = req.body.send_client

    if (!send_client) res.status(400).end();

    const message = await updateSanityStock(send_client);

    res.json({
            message
        });
};
