import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formattedPrice } from '../../utils/priceFormatter.js';
import PageBanner from '../PageBanner.jsx';
import styles from './Checkout.module.css';

const Checkout = () => {
  const navigate = useNavigate();
  // Access input values using ref
  // Initialize ref for each form field
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const addressRef = useRef(null);
  // Get cart list and total from redux store
  const cartList = useSelector((state) => state.cart.listCart);
  const total = useSelector((state) => state.cart.cartTotal);
  // Format total price
  const cartTotal = formattedPrice(total);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    // tự điền thông tin vào form
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneNumberRef.current.value;
    const address = addressRef.current.value;

    try {
      const response = await fetch('https://minimal-shop.onrender.com/order', {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ cartList, total, user: { name, email, phone, address } }),
      });
      const data = await response.json();
      console.log(data);
      navigate('/orders');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Retrieve user info from localStorage
    const userInfo = localStorage.getItem('authUser');
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      // Set form fields with the retrieved and parsed user info
      if (nameRef.current) nameRef.current.value = parsedUserInfo.fullName || '';
      if (emailRef.current) emailRef.current.value = parsedUserInfo.email || '';
      if (phoneNumberRef.current) phoneNumberRef.current.value = parsedUserInfo.phone || '';
    }
  }, []);

  return (
    <>
      <PageBanner title='Checkout' />
      <section className={styles['checkout-wrapper']}>
        <h1>BILLING DETAILS</h1>
        <div className={styles['checkout-body']}>
          <div className={styles['checkout-main']}>
            <form onSubmit={handlePlaceOrder}>
              <div className={styles.control}>
                <label htmlFor='name'>Full Name:</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  ref={nameRef}
                  placeholder='Enter Your Full Name Here!'
                  required
                />
              </div>
              <div className={styles.control}>
                <label htmlFor='email'>Email:</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  ref={emailRef}
                  placeholder='Enter Your Email Here!'
                  required
                />
              </div>
              <div className={styles.control}>
                <label htmlFor='phone-number'>Phone number:</label>
                <input
                  type='number'
                  id='phone-number'
                  name='phone-number'
                  ref={phoneNumberRef}
                  placeholder='Enter Your Phone Number Here!'
                  required
                />
              </div>
              <div className={styles.control}>
                <label htmlFor='address'>Address:</label>
                <input
                  type='text'
                  id='address'
                  name='address'
                  ref={addressRef}
                  placeholder='Enter Your Address Here!'
                  required
                />
              </div>
              <button type='submit'>Place Order</button>
            </form>
          </div>
          <aside className={styles['checkout-total']}>
            <h2>YOUR ORDER</h2>
            <div className={styles['total-body']}>
              {cartList.map((item) => {
                const total = formattedPrice(item.total);
                return (
                  <div key={item.product._id} className={styles['product-name']}>
                    <h3>{item.product.name}</h3>
                    <p>
                      {total} VND x <span>{item.quantity}</span>
                    </p>
                  </div>
                );
              })}
              <div className={styles.total}>
                <h3>TOTAL</h3>
                <p>{cartTotal} VND</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default Checkout;
