import styles from './Categories.module.css';

const Categories = ({ category, onCategoryFilter }) => {
  function handleClick(e) {
    const category = e.target.textContent.toLowerCase();
    // Call onCategoryFilter function with category as argument
    // to filter products by category
    onCategoryFilter(category);
  }

  return (
    <aside className={styles['aside-wrapper']}>
      <div className={styles['aside-content']}>
        <h2>Categories</h2>
        <div className={styles.categories}>
          <div className={styles['categories-item']}>
            <h3>Apple</h3>
            <button onClick={handleClick} className={category === 'all' ? styles.active : ''}>
              All
            </button>
          </div>
          <div className={styles['categories-item']}>
            <h3>Iphone & Mac</h3>
            <button onClick={handleClick} className={category === 'iphone' ? styles.active : ''}>
              Iphone
            </button>
            <button onClick={handleClick} className={category === 'ipad' ? styles.active : ''}>
              Ipad
            </button>
            <button onClick={handleClick} className={category === 'macbook' ? styles.active : ''}>
              Macbook
            </button>
          </div>
          <div className={styles['categories-item']}>
            <h3>Wireless</h3>
            <button onClick={handleClick} className={category === 'airpod' ? styles.active : ''}>
              Airpod
            </button>
            <button onClick={handleClick} className={category === 'watch' ? styles.active : ''}>
              Watch
            </button>
          </div>
          <div className={styles['categories-item']}>
            <h3>Other</h3>
            <button onClick={handleClick} className={category === 'mouse' ? styles.active : ''}>
              Mouse
            </button>
            <button onClick={handleClick} className={category === 'keyboard' ? styles.active : ''}>
              Keyboard
            </button>
            <button onClick={handleClick} className={category === 'other' ? styles.active : ''}>
              Other
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Categories;
