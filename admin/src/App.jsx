import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Chat from './pages/chat/Chat.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Login from './pages/login/Login.jsx';
import Order from './pages/order/Order.jsx';
import AddNewProduct from './pages/product/AddNewProduct.jsx';
import Product from './pages/product/Product.jsx';

// HOC for protected routes
function ProtectedRoute({ path, element: Component, ...rest }) {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('loggedIn');

  return isLoggedIn ? <Outlet /> : <Navigate to='/login' replace />;
}

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<ProtectedRoute />}>
        <Route index element={<Dashboard />} />
        <Route path='products' element={<Product />} />
        <Route path='products/add-new' element={<AddNewProduct />} />
        <Route path='products/edit/:productId' element={<AddNewProduct edit={true} />} />
        <Route path='orders' element={<Order />} />
        <Route path='support' element={<Chat />} />
      </Route>
      <Route path='*' element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
