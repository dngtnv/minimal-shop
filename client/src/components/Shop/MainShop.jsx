import { Suspense, useState } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import Categories from './Categories.jsx';
import styles from './MainShop.module.css';
import ProductList from './ProductList.jsx';

const MainShop = () => {
  const [category, setCategory] = useState('all');
  // Get data from loader
  const data = useLoaderData();

  // Function to filter products by category
  function onCategoryFilter(category) {
    setCategory(category);
  }

  return (
    <div className={styles['shop-wrapper']}>
      <Categories category={category} onCategoryFilter={onCategoryFilter} />
      <main>
        <div className={styles['product-filter']}>
          <input type='text' placeholder='Enter search here!' aria-label='Search product' autoFocus />
          <select name='sort' id='sort'>
            <option value='default'>Default sorting</option>
            <option value='low'>Price: Low to High</option>
            <option value='high'>Price: High to Low</option>
          </select>
        </div>
        <Suspense
          fallback={
            <p style={{ textAlign: 'center', fontSize: '20px', fontStyle: 'italic', fontWeight: 'bold' }}>Loading...</p>
          }
        >
          <Await
            resolve={data.productList}
            errorElement={
              <p style={{ textAlign: 'center', fontSize: '20px', fontStyle: 'italic', fontWeight: 'bold' }}>
                Error loading product!
              </p>
            }
          >
            {(productList) => <ProductList products={productList} category={category} />}
          </Await>
        </Suspense>
        <div className={styles.pagination}>
          <button>Previous</button>
          <button>1</button>
          <button>Next</button>
        </div>
      </main>
    </div>
  );
};

export default MainShop;
