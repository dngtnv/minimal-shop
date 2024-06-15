import { useDispatch } from 'react-redux';
import { formattedPrice } from '../../utils/priceFormatter';
import styles from './ProductItem.module.css';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const productPrice = formattedPrice(product.price);

  // Function to show popup for product details
  function handleClick(product) {
    dispatch({ type: 'SHOW_POPUP', payload: product });
  }

  return (
    <div className={styles['product-item']}>
      <img src={product.img1} alt='product' onClick={() => handleClick(product)} />
      <div className={styles['product-info']}>
        <h3>{product.name}</h3>
        <p>{productPrice} VND</p>
      </div>
    </div>
  );
};

export default ProductItem;
