import { NavLink } from 'react-router-dom';
import product1 from '../assets/product_1.png';
import product2 from '../assets/product_2.png';
import product3 from '../assets/product_3.png';
import product4 from '../assets/product_4.png';
import product5 from '../assets/product_5.png';
import styles from './Categories.module.css';

const Categories = () => {
  return (
    <section className={styles['categories-wrapper']}>
      <div className={styles['categories-header']}>
        <p>Carefully created collections</p>
        <h2>Browse our categories</h2>
      </div>
      <div className={styles['categories-body']}>
        <NavLink to={'shop'} className={styles['first-row']}>
          <img src={product1} alt='Apple product' />
        </NavLink>
        <NavLink to={'shop'} className={styles['first-row']}>
          <img src={product2} alt='Apple product' />
        </NavLink>
        <NavLink to={'shop'} className={styles['second-row']}>
          <img src={product3} alt='Apple product' />
        </NavLink>
        <NavLink to={'shop'} className={styles['second-row']}>
          <img src={product4} alt='Apple product' />
        </NavLink>
        <NavLink to={'shop'} className={styles['second-row']}>
          <img src={product5} alt='Apple product' />
        </NavLink>
      </div>
    </section>
  );
};

export default Categories;
