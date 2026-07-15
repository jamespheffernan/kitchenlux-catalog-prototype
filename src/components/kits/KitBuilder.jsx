import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';
import { SearchBar } from '../shared/SearchBar';

const ProductItem = ({ product, isInKit, onAdd, onRemove }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'product',
    item: { id: product.id, product },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-3 border rounded-lg mb-2 cursor-move ${
        isDragging ? 'opacity-50' : 'bg-white border-gray-200'
      } ${isInKit ? 'border-blue-300 bg-blue-50' : ''}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <div className="font-medium text-gray-900">{product.name}</div>
          <div className="text-sm text-gray-600">
            {product.brand} {product.model} {product.size}
          </div>
          <div className="text-sm font-semibold text-gray-900 mt-1">
            £{product.price?.toFixed(2) || '0.00'}
          </div>
        </div>
        <div className="ml-4">
          {isInKit ? (
            <Button
              variant="danger"
              onClick={() => onRemove(product.id)}
              className="text-xs py-1 px-2"
            >
              Remove
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => onAdd(product.id)}
              className="text-xs py-1 px-2"
            >
              Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const KitProductsList = ({ productIds, products, onRemove }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'product',
    drop: (item) => {
      if (!productIds.includes(item.id)) {
        // Item will be added by parent
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const kitProducts = productIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  return (
    <div
      ref={drop}
      className={`border-2 rounded-lg p-4 min-h-[200px] ${
        isOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
      }`}
    >
      <h3 className="font-medium text-gray-900 mb-3">Products in Kit ({kitProducts.length})</h3>
      {kitProducts.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p>Drop products here or search and add them</p>
        </div>
      ) : (
        <div className="space-y-2">
          {kitProducts.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center p-2 bg-white border border-gray-200 rounded"
            >
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                <div className="text-xs text-gray-600">
                  {product.brand} {product.model}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">
                  £{product.price?.toFixed(2) || '0.00'}
                </span>
                <button
                  onClick={() => onRemove(product.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Remove"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const KitBuilderContent = ({ kit, products, onSave, onClose }) => {
  const [productIds, setProductIds] = useState(kit?.productIds || []);
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(product => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.brand.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    );
  });

  const handleAddProduct = (productId) => {
    if (!productIds.includes(productId)) {
      setProductIds([...productIds, productId]);
    }
  };

  const handleRemoveProduct = (productId) => {
    setProductIds(productIds.filter(id => id !== productId));
  };

  const handleSave = () => {
    onSave(productIds);
    onClose();
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Build: {kit?.name || 'New Kit'}</h2>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search products to add..."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Available Products ({filteredProducts.length})</h3>
          <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-3">
            {filteredProducts.map(product => (
              <ProductItem
                key={product.id}
                product={product}
                isInKit={productIds.includes(product.id)}
                onAdd={handleAddProduct}
                onRemove={handleRemoveProduct}
              />
            ))}
          </div>
        </div>

        <div>
          <KitProductsList
            productIds={productIds}
            products={products}
            onRemove={handleRemoveProduct}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save Kit</Button>
      </div>
    </div>
  );
};

export const KitBuilder = ({ kit, products, isOpen, onClose, onSave }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Kit Builder"
    >
      <DndProvider backend={HTML5Backend}>
        <KitBuilderContent
          key={kit?.id || 'new-kit'}
          kit={kit}
          products={products}
          onSave={onSave}
          onClose={onClose}
        />
      </DndProvider>
    </Modal>
  );
};
