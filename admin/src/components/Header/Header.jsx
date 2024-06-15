import styles from '../Header/Header.module.css';

const Header = () => {
  return (
    <header>
      <div className={styles.headerWrapper}>
        <div className={styles.navbarTop}>
          <span className={styles.logo}>
            <a href='/'>Admin Page</a>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
