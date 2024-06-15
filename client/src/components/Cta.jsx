import styles from './CTA.module.css';

const Cta = () => {
  return (
    <section className={styles['cta-wrapper']}>
      <div className={styles.services}>
        <div className={styles['services-content']}>
          <div className={styles['service-item']}>
            <h3>Free shipping</h3>
            <p>Free shipping worldwide</p>
          </div>
          <div className={styles['service-item']}>
            <h3>24 x 7 Service</h3>
            <p>Free shipping worldwide</p>
          </div>
          <div className={styles['service-item']}>
            <h3>Festival Offer</h3>
            <p>Free shipping worldwide</p>
          </div>
        </div>
      </div>
      <div className={styles['main-cta-wrapper']}>
        <div className={styles['cta-left']}>
          <h3>Let&apos;s Be Friends!</h3>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        <div className={styles['cta-right']}>
          <input type='text' placeholder='Enter your email address' />
          <button type='button'>Subscribe</button>
        </div>
      </div>
    </section>
  );
};

export default Cta;
