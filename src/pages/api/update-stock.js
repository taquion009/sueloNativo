import { updateSanityStock } from '../../lamda-services/stock-handling.service';

export default function update(req, res){
  if (req.method !== 'POST')
    res.status(404).json({
      error: {
        code: 'not_found',
        message: "ErrorMessages.EndpointMethodIncorrect,"
      },
    });

  const paymentId = req.body.id
  if (!paymentId) res.status(400).end();

  updateSanityStock(paymentId);

  res.json({
        data: {
            id: paymentId,
        }
    });
};
