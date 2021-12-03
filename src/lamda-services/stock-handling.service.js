import { sanityWriteClient as sanityClient } from '../lib/sanity';
import { getPayment } from './mercadopago.service';

export const updateSanityStock = async (paymentId) => {
  const paymentData = await getPayment(paymentId);
  const references = JSON.parse(paymentData.response.external_reference);

  const patches = references.map((reference) => {
    const { id, quantity, size } = reference;

    const patch = {
      patch: {
        id,
        dec: {},
      },
    };

    if (size) {
      const property = `sizeChart[_key == "${size}"].stock`;
      patch.patch.dec[property] = quantity;
    } else patch.patch.dec = { stock: quantity };

    return patch;
  });

  sanityClient.transaction(patches).commit();
};
