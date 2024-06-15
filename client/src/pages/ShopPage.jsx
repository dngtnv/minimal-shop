import PageBanner from '../components/PageBanner.jsx';
import MainShop from '../components/Shop/MainShop.jsx';

const ShopPage = () => {
  return (
    <>
      <PageBanner title='Shop' />
      <section>
        <MainShop />
      </section>
    </>
  );
};

export default ShopPage;
