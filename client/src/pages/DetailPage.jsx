import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import ProductDetail from '../components/Shop/ProductDetail.jsx';
import { getProductById, getProductList } from '../utils/loaders.js';

const DetailPage = () => {
  const data = useLoaderData();

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={Promise.all([data.product, data.productList])} errorElement={<p>Error loading product!</p>}>
          {([product, productList]) => {
            const relatedProducts = productList.filter((p) => p.category === product.category && p._id !== product._id);
            return <ProductDetail product={product} relatedProducts={relatedProducts} />;
          }}
        </Await>
      </Suspense>
    </>
  );
};

export default DetailPage;

export function loader({ params }) {
  const productId = params.productId;
  return defer({ product: getProductById(productId), productList: getProductList() });
}
