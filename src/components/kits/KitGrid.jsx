import { KitCard } from './KitCard';

export const KitGrid = ({ kits, products = [], onKitClick, onEdit, onDelete, loading }) => {
  const getProductCount = (kit) => {
    if (!kit.productIds) return 0;
    return kit.productIds.filter(id => products.some(p => p.id === id)).length;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 animate-pulse">
            <div className="p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (kits.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No kits</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new kit.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {kits.map((kit) => (
        <KitCard
          key={kit.id}
          kit={kit}
          productCount={getProductCount(kit)}
          onClick={() => onKitClick?.(kit)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
