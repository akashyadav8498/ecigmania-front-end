import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CustomerLayout } from './layouts/CustomerLayout';
import { HomePage } from './pages/HomePage';
import { SearchResultsPage } from './pages/customer/SearchResultsPage';
import { CategoryPage } from './pages/customer/CategoryPage';
import { CategoriesIndexPage } from './pages/customer/CategoriesIndexPage';
import { ProductPage } from './pages/customer/ProductPage';
import { DealsPage } from './pages/customer/DealsPage';
import { BrandsIndexPage } from './pages/customer/BrandsIndexPage';
import { BrandDetailPage } from './pages/customer/BrandDetailPage';
import { BestOfPage } from './pages/customer/BestOfPage';

// Placeholder generic page
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="container">
      <h1 style={{ marginTop: 'var(--space-8)' }}>{title}</h1>
      <p>Placeholder content for {title}.</p>
    </div>
  );
}

// Initialize theme on load to prevent flash of unstyled content
const getInitialTheme = () => {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
document.documentElement.setAttribute('data-theme', getInitialTheme());

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchResultsPage />} />
          <Route path="categories" element={<CategoriesIndexPage />} />
          <Route path="category/:slug" element={<CategoryPage />} />
          <Route path="product/:slug" element={<ProductPage />} />
          <Route path="best-of" element={<BestOfPage />} />
          <Route path="deals" element={<DealsPage />} />
          <Route path="brands" element={<BrandsIndexPage />} />
          <Route path="brand/:slug" element={<BrandDetailPage />} />
          <Route path="blog" element={<PlaceholderPage title="Blog" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
