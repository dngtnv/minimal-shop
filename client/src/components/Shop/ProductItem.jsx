import { Link } from 'react-router-dom';
import { formattedPrice } from '../../utils/priceFormatter';
import styles from './ProductItem.module.css';

const ProductItem = ({ product }) => {
  const productId = product._id;
  // Format product price
  const productPrice = formattedPrice(product.price);

  return (
    <div className={styles['product-item']}>
      <Link to={`/detail/${productId}`}>
        <img src={product.img1} alt='product' />
      </Link>
      <div className={styles['product-info']}>
        <h3>{product.name}</h3>
        <p>{productPrice} VND</p>
      </div>
    </div>
  );
};

export default ProductItem;
