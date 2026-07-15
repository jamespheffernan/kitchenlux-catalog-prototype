import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { KitsPage } from './pages/KitsPage';
import { ImportPage } from './pages/ImportPage';
import './utils/seedInit'; // Initialize seed utility

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/kits" element={<KitsPage />} />
            <Route path="/import" element={<ImportPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
