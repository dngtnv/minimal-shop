import { useEffect, useState } from 'react';
import ProductItem from './ProductItem.jsx';
import styles from './ProductList.module.css';

const ProductList = ({ products, category }) => {
  const [productList, setProductList] = useState(products);
  // Filter product list based on category
  useEffect(() => {
    if (category === 'all') {
      setProductList(products);
    } else {
      // Use Array.filter to get the product's category that match the category
      const filteredProduct = products.filter((product) => product.category === category);
      setProductList(filteredProduct);
    }
  }, [category]);

  return (
    <div className={styles['product-list']}>
      {productList.length === 0 && <p>No product match!</p>}
      {productList.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
