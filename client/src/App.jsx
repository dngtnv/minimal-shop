import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromChildren } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import DetailPage, { loader as productDetailLoader } from './pages/DetailPage.jsx';
import HomePage, { loader as productsLoader } from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import OrderDetailPage from './pages/OrderDetailPage.jsx';
import OrderPage from './pages/OrderPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ShopPage from './pages/ShopPage.jsx';

// ProtectedRoute Component
function ProtectedRoute({ children }) {
  const isAuthRedux = useSelector((state) => state.auth.isAuth);
  // Immediately check for authentication state in localStorage
  const isAuthPersistent = JSON.parse(localStorage.getItem('authUser'));
  const [isAuthenticated, setIsAuthenticated] = useState(isAuthRedux || isAuthPersistent);

  useEffect(() => {
    setIsAuthenticated(isAuthRedux || isAuthPersistent);
  }, [isAuthRedux]);

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  // If authenticated, render the children components
  return children;
}

const AuthHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    let isAuthenticated = false;
    if (!token) {
      return;
    }
    isAuthenticated = true;
    if (isAuthenticated) {
      // Dispatch an action to set isAuth to true
      dispatch({ type: 'SET_AUTH', isAuth: true });
    }
  }, [dispatch]);

  return null; // This component doesn't render anything
};

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<HomePage />} loader={productsLoader} />
      <Route path='shop' element={<ShopPage />} loader={productsLoader} />
      <Route path='detail/:productId' element={<DetailPage />} loader={productDetailLoader} />
      <Route
        path='cart'
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='checkout'
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='orders'
        element={
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='order-detail/:orderId'
        element={
          <ProtectedRoute>
            <OrderDetailPage />
          </ProtectedRoute>
        }
      />
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <AuthHandler />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
