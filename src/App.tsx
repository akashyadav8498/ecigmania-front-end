import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductListingPage } from "./pages/ProductListingPage";
import { LoginPage } from "./pages/LoginPage";
import { AdminLayout } from "./layouts/AdminLayout";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminProductsPage } from "./pages/admin/AdminProductsPage";
import { AdminProductFormPage } from "./pages/admin/AdminProductFormPage";
import { AdminImportsPage } from "./pages/admin/AdminImportsPage";
import { AdminEmailsPage } from "./pages/admin/AdminEmailsPage";
import { AdminUsersPage } from "./pages/admin/AdminUsersPage";
import { ProductProvider } from "./lib/ProductContext";

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/catalog" element={<ProductListingPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="products/new" element={<AdminProductFormPage />} />
            <Route path="products/:id/edit" element={<AdminProductFormPage />} />
            <Route path="imports" element={<AdminImportsPage />} />
            <Route path="emails" element={<AdminEmailsPage />} />
            <Route path="users" element={<AdminUsersPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
