import styles from './PageBanner.module.css';

const PageBanner = ({ title }) => {
  return (
    <section className={styles['banner-wrapper']}>
      <div className={styles['banner-content']}>
        <p className={styles.title}>{title}</p>
        <p>Home / {title}</p>
      </div>
    </section>
  );
};

export default PageBanner;
