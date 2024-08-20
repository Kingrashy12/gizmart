export function getUpdatedValue(
  form: EditProductBodyType,
  product: ProductType
) {
  const { name, price, description, quantity } = form;
  const {
    price: _price,
    description: desc,
    name: _name,
    quantity: quan,
  } = product;

  if (price != _price) {
    return { price: price };
  }

  if (name != _name) {
    return { name: name };
  }

  if (description != desc) {
    return { description: description };
  }

  if (quantity != quan) {
    return { quantity: quantity };
  }

  return null;
}
