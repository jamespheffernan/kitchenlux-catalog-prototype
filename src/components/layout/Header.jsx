import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              Catalog Prototype
            </Link>
          </div>

          <nav className="flex space-x-4">
            <Link
              to="/products"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/products')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Products
            </Link>
            <Link
              to="/kits"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/kits')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Kits
            </Link>
            <Link
              to="/import"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/import')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Import/Export
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
