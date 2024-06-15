import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import Banner from '../components/Banner.jsx';
import Cta from '../components/CTA.jsx';
import Categories from '../components/Categories.jsx';
import TopProduct from '../components/Product/TopProduct.jsx';
import { getProductList } from '../utils/loaders.js';

const HomePage = () => {
  const data = useLoaderData();

  return (
    <>
      <Banner />
      <Categories />
      <Suspense
        fallback={
          <p style={{ textAlign: 'center', fontSize: '20px', fontStyle: 'italic', fontWeight: 'bold' }}>Loading...</p>
        }
      >
        <Await
          resolve={data.productList}
          errorElement={
            <p style={{ textAlign: 'center', fontSize: '20px', fontStyle: 'italic', fontWeight: 'bold' }}>
              Error loading products!
            </p>
          }
        >
          {(productList) => <TopProduct productList={productList} />}
        </Await>
      </Suspense>
      <Cta />
    </>
  );
};

export default HomePage;

export function loader() {
  return defer({ productList: getProductList() });
}
