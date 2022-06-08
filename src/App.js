import { Routes, Route } from 'react-router-dom';
import { Navbar, Footer, PrivateRoute, RequireAdmin } from './components';
import {
  SignUp,
  Home,
  Login,
  ProductDetails,
  Dashboard,
  MyOrders,
  AddReview,
  MyProfile,
  AllUsers,
  AllOrders,
  AddProduct,
  AllProducts,
  Portfolio,
  NotFound,
  Payment,
  Blog,
  ResetPassword,
  MyReviews,
  GetAllProducts,
  AllReviews,
} from './pages';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoute />}>
          <Route path="/products/details/:id" element={<ProductDetails />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<MyProfile />} />
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="add-review" element={<AddReview />} />
            <Route path="my-reviews" element={<MyReviews />} />
            <Route path="payment" element={<Payment />} />

            <Route element={<RequireAdmin />}>
              <Route path="manage-users" element={<AllUsers />} />
              <Route path="manage-all-orders" element={<AllOrders />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="manage-products" element={<AllProducts />} />
            </Route>
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forget-password" element={<ResetPassword />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/products" element={<GetAllProducts />} />
        <Route path="/reviews" element={<AllReviews />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
