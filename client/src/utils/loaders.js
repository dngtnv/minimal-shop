export async function getProductList() {
  try {
    const response = await fetch('https://minimal-shop.onrender.com/products');

    if (!response.ok) {
      throw new Error('Error loading products!');
    }

    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductById(productId) {
  try {
    const response = await fetch('https://minimal-shop.onrender.com/product/' + productId);

    if (!response.ok) {
      throw new Error('Error loading product!');
    }

    const data = await response.json();
    const product = data.product;
    return product;
  } catch (error) {
    console.error(error);
  }
}
