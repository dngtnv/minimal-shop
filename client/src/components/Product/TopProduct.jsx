import ProductItem from './ProductItem.jsx';
import ProductModal from './ProductModal.jsx';
import styles from './TopProduct.module.css';

const TopProduct = ({ productList }) => {
  return (
    <section className={styles['top-product']}>
      <div className={styles['top-product-header']}>
        <p>Made the hard way</p>
        <h2>Top trending products</h2>
      </div>
      <div className={styles['top-product__list']}>
        {productList.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
      <ProductModal />
    </section>
  );
};

export default TopProduct;
