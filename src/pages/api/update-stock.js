import { ErrorMessages } from '../../config/error-messages';
import { updateSanityStock } from '../../lamda-services/stock-handling.service';

export default (req, res) => {
  if (req.method !== 'POST')
    res.status(404).json({
      error: {
        code: 'not_found',
        message: ErrorMessages.EndpointMethodIncorrect,
      },
    });

  const paymentId = req.body?.data?.id
  const paymentAction = req.body?.data?.action
  if (!paymentId || paymentAction !== 'payment.updated') res.status(200).end();

  updateSanityStock(paymentId);

  res.status(200).end();
};
