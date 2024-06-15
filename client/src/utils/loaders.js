export async function getProductList() {
  try {
    const response = await fetch('http://localhost:5000/products');

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
    const response = await fetch('http://localhost:5000/product/' + productId);

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
