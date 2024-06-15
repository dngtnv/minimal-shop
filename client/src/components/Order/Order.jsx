import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../../components/PageBanner.jsx';
import styles from './Order.module.css';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('authUser'));
  const userId = user ? user.userId : null;

  useEffect(() => {
    // Fetch orders from the server
    fetch(`http://localhost:5000/orders/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setOrders(data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <PageBanner title='History' />
      <section className={styles['history-wrapper']}>
        <h1>YOUR ORDERS</h1>
        <div className={styles['history-body']}>
          <div className={styles['order-table']}>
            <table>
              <thead>
                <tr>
                  <th style={{ width: '13%' }}>ID ORDER</th>
                  <th style={{ width: '13%' }}>ID USER</th>
                  <th>NAME</th>
                  <th>PHONE</th>
                  <th>ADDRESS</th>
                  <th>TOTAL</th>
                  <th>DELIVERY</th>
                  <th>STATUS</th>
                  <th>DETAIL</th>
                </tr>
              </thead>
              <tbody>
                {orders.length !== 0 &&
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.user.userId._id}</td>
                      <td>{order.user.userId.fullName}</td>
                      <td>{order.user.userId.phone}</td>
                      <td>{order.user.address}</td>
                      <td>{order.total} VNĐ</td>
                      <td>Waiting for processing</td>
                      <td>{order.status}</td>
                      <td>
                        <Link to={`/order-detail/${order._id}`} className={styles['btn']}>
                          View
                          <svg
                            height={16}
                            width={16}
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3'
                            />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderPage;
