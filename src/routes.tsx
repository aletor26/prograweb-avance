import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import OrderComplete from './pages/OrderComplete/OrderComplete';
import Products from './pages/Products/Products';
import Category from './pages/Category/Category';
import About from './pages/About/About';
import Orders from './pages/Orders/Orders';
import OrderDetail from './pages/OrderDetail/OrderDetail';
import Profile from './pages/Profile/Profile';
import Search from './pages/Search/Search';
import Offers from './pages/Offers/Offers';
import AdminOrders from './pages/Admin/AdminOrders';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminHome from './pages/Admin/AdminHome';
//FRANCO 
import UserList from './pages/Admin/Users/UserList';
import UserDetail from './pages/Admin/Users/UserDetail';
import OrderList from './pages/Admin/Orders_2/OrderList';
import OrderDetailAdmin from './pages/Admin/Orders_2/OrderDetail';

interface AdminRouteProps {
  children: React.ReactNode;
}

interface CustomerRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const CustomerRoute = ({ children }: CustomerRouteProps) => {
  const { user } = useAuth();

  if (user?.role === 'admin') {
    return <Navigate to="/admin/orders" />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Rutas protegidas - Solo clientes */}
      <Route path="/cart" element={
        <ProtectedRoute>
          <CustomerRoute>
            <Cart />
          </CustomerRoute>
        </ProtectedRoute>
      } />
      <Route path="/checkout" element={
        <ProtectedRoute>
          <CustomerRoute>
            <Checkout />
          </CustomerRoute>
        </ProtectedRoute>
      } />
      <Route path="/order-complete" element={
        <ProtectedRoute>
          <CustomerRoute>
            <OrderComplete />
          </CustomerRoute>
        </ProtectedRoute>
      } />
      <Route path="/orders" element={
        <ProtectedRoute>
          <CustomerRoute>
            <Orders />
          </CustomerRoute>
        </ProtectedRoute>
      } />
      <Route path="/orders/:orderId" element={
        <ProtectedRoute>
          <CustomerRoute>
            <OrderDetail />
          </CustomerRoute>
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <CustomerRoute>
            <Profile />
          </CustomerRoute>
        </ProtectedRoute>
      } />

      {/* Rutas protegidas - Acceso general */}
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/productos" element={<ProtectedRoute><Products /></ProtectedRoute>} />
      <Route path="/category/:category" element={<ProtectedRoute><Category /></ProtectedRoute>} />
      <Route path="/nosotros" element={<About />} />
      <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
      <Route path="/ofertas" element={<ProtectedRoute><Offers /></ProtectedRoute>} />

      {/* Rutas de administrador */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        </ProtectedRoute>
    } />
      <Route path="/admin/orders/dashboard" element={
        <ProtectedRoute>
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        </ProtectedRoute>
  } />


  <Route path="/admin/users" element={
    <ProtectedRoute>
      <AdminRoute>
        <UserList />
        </AdminRoute>
        </ProtectedRoute>} 
        />
  <Route path="/admin/users/:userId" element={
    <ProtectedRoute>
      <AdminRoute>
        <UserDetail />
        </AdminRoute>
        </ProtectedRoute>} 
        />
  <Route path="/admin/orders" element={
    <ProtectedRoute>
      <AdminRoute>
        <OrderList />
        </AdminRoute>
        </ProtectedRoute>} 
        />
  <Route path="/admin/orders/:orderId" element={
    <ProtectedRoute>
      <AdminRoute>
        <OrderDetail />
        </AdminRoute>
        </ProtectedRoute>} 
        />
    </Routes>
  );
};

export default AppRoutes; 