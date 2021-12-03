const STORAGE_KEY = 'cart';

export const findProduct = (cart, product) => cart?.find((x) => x._id === product._id);

export const addToCart = (product) => {
  const cartContent = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];

  const foundProduct = findProduct(cartContent, product);

  if (foundProduct) foundProduct.quantity = Number(product.quantity);
  else cartContent.push(product);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartContent));
};

export const removeFromCart = (product) => {
  let cartContent = JSON.parse(localStorage.getItem(STORAGE_KEY));
  cartContent = cartContent ? cartContent.filter((cartProd) => cartProd._id !== product._id) : [];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartContent));
};

export const UpdateQuantityCart = (product) => {
  const cartContent = JSON.parse(localStorage.getItem(STORAGE_KEY))

  const foundProduct = findProduct(cartContent, product);

  if (foundProduct) foundProduct.quantity = product.quantity;
  else cartContent.push(product);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartContent));
};

export const emptyCart = () => localStorage.removeItem(STORAGE_KEY);

export const getCart = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
