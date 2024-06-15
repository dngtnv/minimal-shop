import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-content']}>
        <div className={styles['footer-col']}>
          <h3>Customer services</h3>
          <div>
            <ul>
              <li>
                <a href='#'>Help & Contact Us</a>
              </li>
              <li>
                <a href='#'>Returns & Refunds</a>
              </li>
              <li>
                <a href='#'>Online</a>
              </li>
              <li>
                <a href='#'>Terms & Conditions</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles['footer-col']}>
          <h3>Company</h3>
          <div>
            <ul>
              <li>
                <a href='#'>What We Do</a>
              </li>
              <li>
                <a href='#'>Available Services</a>
              </li>
              <li>
                <a href='#'>Latest Posts</a>
              </li>
              <li>
                <a href='#'>FAQs</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles['footer-col']}>
          <h3>Social Media</h3>
          <div>
            <ul>
              <li>
                <a href='#'>Twitter</a>
              </li>
              <li>
                <a href='#'>Instagram</a>
              </li>
              <li>
                <a href='#'>Facebook</a>
              </li>
              <li>
                <a href='#'>Pinterest</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
