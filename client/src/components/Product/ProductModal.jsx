import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formattedPrice } from '../../utils/priceFormatter';
import styles from './ProductModal.module.css';

const ProductModal = () => {
  const dispatch = useDispatch();
  // Get product and showPopUp state from redux store
  const product = useSelector((state) => state.popup.product);
  const isShow = useSelector((state) => state.popup.showPopUp);
  const dialogRef = useRef();
  const productPrice = formattedPrice(product.price);

  // Handle close popup
  function handleClose(e) {
    e.preventDefault();
    dispatch({ type: 'HIDE_POPUP' });
  }

  useEffect(() => {
    // Copy dialogRef.current to a variable inside the effect cleanup function
    const dialog = dialogRef.current;
    if (isShow) {
      dialog.showModal();
    } else {
      dialog.close();
    }

    return () => {
      // Use the variable 'dialog' in the cleanup function
      dialog.close();
    };
  }, [isShow]);

  return (
    <dialog ref={dialogRef} className={styles['modal-wrapper']}>
      <button className={styles['close-btn']} type='button' onClick={handleClose}>
        <span>
          <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24'>
            <path
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </span>
      </button>
      <div className={styles['modal-content']}>
        <div className={styles['product-img']}>{isShow && <img src={product.img1} alt={product.name} />}</div>
        <div className={styles['product-text']}>
          <h1 className={styles['product-name']}>{product.name}</h1>
          <p className={styles['product-price']}>{productPrice} VND</p>
          <p className={styles['product-desc']}>{product.short_desc}</p>
          <Link to={`detail/${product._id ? product._id : ''}`} onClick={() => dispatch({ type: 'HIDE_POPUP' })}>
            <span className={styles['nav-icon']}>
              <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 20 20'>
                <path
                  fill='currentColor'
                  d='M3 1a1 1 0 0 0 0 2h1.22l.305 1.222a.997.997 0 0 0 .01.042l1.358 5.43l-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 0 0 0-2H6.414l1-1H14a1 1 0 0 0 .894-.553l3-6A1 1 0 0 0 17 3H6.28l-.31-1.243A1 1 0 0 0 5 1zm13 15.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M6.5 18a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3'
                />
              </svg>
            </span>
            View detail
          </Link>
        </div>
      </div>
    </dialog>
  );
};

export default ProductModal;
