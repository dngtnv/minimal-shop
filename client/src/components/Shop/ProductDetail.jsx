import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { formattedPrice } from '../../utils/priceFormatter.js';
import styles from './ProductDetail.module.css';
import ProductItem from './ProductItem.jsx';

const ProductDetail = ({ product, relatedProducts }) => {
  const [highlightImg, setHighlightImg] = useState(product.img1);
  // create a ref to store the quantity input element
  const quantityRef = useRef();
  const dispatch = useDispatch();
  // format the price to display
  const productPrice = formattedPrice(product.price);

  function handleHighlightImg(image) {
    setHighlightImg(image);
  }

  async function handleAddToCart() {
    // get the quantity value from the input element
    const quantity = +quantityRef.current.value;
    // try {
    //   const response = await
    // }
    // dispatch an action to add the product to the cart
    dispatch({ type: 'ADD_CART', payload: { product, quantity: quantity } });
    alert('Added to cart');
  }
  // set the highlight image to the first image when the product changes
  useEffect(() => {
    setHighlightImg(product.img1);
  }, [product]);

  return (
    <section className={styles['detail-wrapper']}>
      <div className={styles['product-detail']}>
        <div className={styles['product-images']}>
          <div className={styles['image-list']}>
            <img onClick={() => handleHighlightImg(product.img1)} src={product.img1} alt={product.name} />
            <img onClick={() => handleHighlightImg(product.img2)} src={product.img2} alt={product.name} />
            <img onClick={() => handleHighlightImg(product.img3)} src={product.img3} alt={product.name} />
            <img onClick={() => handleHighlightImg(product.img4)} src={product.img4} alt={product.name} />
          </div>
          <div className={styles['highlight-image']}>
            <img src={highlightImg} alt={product.category} />
          </div>
        </div>
        <div className={styles['product-info']}>
          <h1>{product.name}</h1>
          <p className={styles['product-price']}>{productPrice} VND</p>
          <p className={styles['product-description']}>{product.short_desc}</p>
          <p className={styles['product-category']}>
            <span>Category:</span>
            {product.category}
          </p>
          <div className={styles['quantity']}>
            <input
              ref={quantityRef}
              type='number'
              defaultValue='1'
              required
              min='1'
              name='quantity'
              aria-label='Enter quantity'
            />
            <button onClick={handleAddToCart} className={styles['add-btn']}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className={styles['product-long-desc']}>
        <span>Description</span>
        <h2>Product description</h2>
        <p>
          {/* splits the string into an array of lines then maps over to render */}
          {product.long_desc.split('\n').map((line, index) => (
            <Fragment key={index}>
              {line}
              <br />
            </Fragment>
          ))}
        </p>
      </div>
      <div className={styles['related-products']}>
        <h2>Related Products</h2>
        <div className={styles['product-list']}>
          {relatedProducts.map((p) => (
            <ProductItem key={p._id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
