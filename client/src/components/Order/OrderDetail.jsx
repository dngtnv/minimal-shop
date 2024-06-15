import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageBanner from '../../components/PageBanner.jsx';
import styles from './OrderDetail.module.css';

const OrderDetail = () => {
  const orderId = useParams().orderId;
  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetch(`https://minimal-shop.onrender.com/order-detail/${orderId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch order detail');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setOrder(data.order);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <PageBanner title='Order Detail' />
      <section className={styles['detail-wrapper']}>
        <div className={styles['detail-body']}>
          <h2>INFORMATION ORDER</h2>
          <div className={styles['detail-text']}>
            {order.user && order.user.userId && (
              <>
                <p>ID User: {order.user.userId._id}</p>
                <p>Full Name: {order.user.userId.fullName}</p>
                <p>Phone: {order.user.userId.phone}</p>
              </>
            )}
            <p>Address: {order.user?.address}</p>
            <p>Total: {order.total} VND</p>
          </div>
          <div className={styles['detail-table']}>
            <table>
              <thead>
                <tr>
                  <th>ID PRODUCT</th>
                  <th>IMAGE</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>COUNT</th>
                </tr>
              </thead>
              <tbody>
                {order.products &&
                  order.products.length !== 0 &&
                  order.products.map((item) => (
                    <tr key={item.product._id}>
                      <td>{item.product._id}</td>
                      <td>
                        <div className={styles['product-img']}>
                          <img src={item.product.img1} alt={item.product.name} />
                        </div>
                      </td>
                      <td>{item.product.name}</td>
                      <td>{item.product.price} VND</td>
                      <td>{item.quantity}</td>
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

export default OrderDetail;
