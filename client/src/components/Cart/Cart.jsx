import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formattedPrice } from '../../utils/priceFormatter.js';
import PageBanner from '../PageBanner.jsx';
import styles from './Cart.module.css';
import CartProductItem from './CartProductItem.jsx';

const Cart = () => {
  // Get cart list and total from redux store
  const cartList = useSelector((state) => state.cart.listCart);
  const total = useSelector((state) => state.cart.cartTotal);
  // Format total price
  const cartTotal = formattedPrice(total);

  return (
    <>
      <PageBanner title='Cart' />
      <section className={styles['cart-wrapper']}>
        <h1>SHOPPING CART</h1>
        <div className={styles['cart-body']}>
          <div className={styles['cart-main']}>
            <div className={styles['cart-table']}>
              <table>
                <thead>
                  <tr>
                    <th>IMAGE</th>
                    <th style={{ width: '35%' }}>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                    <th>REMOVE</th>
                  </tr>
                </thead>
                <tbody>
                  {cartList.length !== 0 &&
                    cartList.map((item) => (
                      <CartProductItem key={item.product._id} product={item.product} quantity={item.quantity} />
                    ))}
                </tbody>
              </table>
              {cartList.length === 0 && (
                <p style={{ textAlign: 'center', marginBlock: '1rem' }}>There no product in your cart!</p>
              )}
            </div>
            <div className={styles.navigate}>
              <Link to={'/shop'} className={styles['nav-left']}>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    width='24'
                    height='24'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18' />
                  </svg>
                </span>
                Continue shopping
              </Link>
              <Link to={'/checkout'} className={styles['nav-right']}>
                Process to checkout
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    width='24'
                    height='24'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3' />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          <aside className={styles['cart-total']}>
            <h2>CART TOTAL</h2>
            <div className={styles['total-body']}>
              <div className={styles['sub-total']}>
                <h3>SUBTOTAL</h3>
                <p>{cartTotal} VND</p>
              </div>
              <div className={styles['total']}>
                <h3>TOTAL</h3>
                <p>{cartTotal} VND</p>
              </div>
              <div className={styles['coupon']}>
                <input type='text' placeholder='Enter your coupon' />
                <button>
                  <span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      width='24'
                      height='24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z'
                      />
                    </svg>
                  </span>
                  Apply Coupon
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default Cart;
