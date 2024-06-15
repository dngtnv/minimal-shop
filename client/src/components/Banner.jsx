import { useNavigate } from 'react-router-dom';
import styles from './Banner.module.css';

const Banner = () => {
  const navigate = useNavigate();
  // Function to navigate to shop page
  const handleClick = () => navigate('/shop');
  return (
    <section className={styles['banner-wrapper']}>
      <div className={styles['banner-content']}>
        <p>New inspiration 2024</p>
        <h1>
          20% off on new <br /> season
        </h1>
        <button onClick={handleClick}>Browse collections</button>
      </div>
    </section>
  );
};

export default Banner;
