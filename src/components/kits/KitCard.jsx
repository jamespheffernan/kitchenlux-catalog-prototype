export const KitCard = ({ kit, productCount = 0, onClick, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{kit.name}</h3>
            {kit.popular && (
              <span className="inline-block mt-1 text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                Popular
              </span>
            )}
          </div>
          <div className="flex space-x-1 ml-2">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(kit);
                }}
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                title="Edit"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Delete ${kit.name}?`)) {
                    onDelete(kit.id);
                  }
                }}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                title="Delete"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {kit.description && (
          <p className="text-gray-600 mb-3">{kit.description}</p>
        )}

        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-gray-900">{kit.price}</span>
          <span className="text-sm text-gray-500">{kit.period}</span>
        </div>

        {kit.perfectFor && (
          <p className="text-sm text-gray-500 mb-3">{kit.perfectFor}</p>
        )}

        <div className="text-sm text-gray-600">
          <span className="font-medium">{productCount || kit.productIds?.length || 0}</span> products
        </div>
      </div>
    </div>
  );
};
