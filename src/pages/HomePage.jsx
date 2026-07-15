import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useKits } from '../hooks/useKits';
import { Button } from '../components/shared/Button';
import { generateSeedData } from '../data/seedData';
import { saveCatalog } from '../utils/storage';

export const HomePage = () => {
  const { products, loading: productsLoading, reload: reloadProducts } = useProducts();
  const { kits, loading: kitsLoading, reload: reloadKits } = useKits();

  const handleSeedData = async () => {
    if (!window.confirm("Replace this browser's catalog with fictional sample data?")) {
      return;
    }

    try {
      const seedData = generateSeedData();
      await saveCatalog(seedData);
      alert(`Restored ${seedData.products.length} sample products and ${seedData.kits.length} sample kits.`);
      await reloadProducts();
      await reloadKits();
    } catch (error) {
      console.error('Failed to seed catalog:', error);
      alert(`Failed to seed catalog: ${error.message}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">KitchenLux Catalog Prototype</h1>
        <p className="text-xl text-gray-600">
          Explore a browser-local product and kit management concept
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Products</h2>
            <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {productsLoading ? '...' : products.length}
          </div>
          <p className="text-sm text-gray-600 mb-4">Items in catalog</p>
          <Link to="/products">
            <Button variant="primary" className="w-full">Manage Products</Button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Kits</h2>
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {kitsLoading ? '...' : kits.length}
          </div>
          <p className="text-sm text-gray-600 mb-4">Kit configurations</p>
          <Link to="/kits">
            <Button variant="primary" className="w-full">Manage Kits</Button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Import/Export</h2>
            <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">CSV</div>
          <p className="text-sm text-gray-600 mb-4">Bulk operations</p>
          <Link to="/import">
            <Button variant="primary" className="w-full">Import / Export</Button>
          </Link>
        </div>
      </div>

      {(products.length === 0 && kits.length === 0 && !productsLoading && !kitsLoading) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-yellow-900 mb-2">No Data Yet</h2>
          <p className="text-sm text-yellow-800 mb-4">
            Your local catalog is empty. Restore the fictional sample data or start adding products manually.
          </p>
          <Button variant="primary" onClick={handleSeedData}>
            Restore Fictional Sample Data
          </Button>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">Quick Start</h2>
        <ul className="space-y-2 text-sm text-blue-800 list-disc list-inside">
          <li>Add products individually or import from CSV</li>
          <li>Create kits and compose them from products using drag-and-drop</li>
          <li>Export your catalog as CSV or JSON for backup or migration</li>
          <li>All data stays in this browser's local storage</li>
        </ul>
      </div>
    </div>
  );
};
