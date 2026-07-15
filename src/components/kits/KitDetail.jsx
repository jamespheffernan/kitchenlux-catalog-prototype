import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';

export const KitDetail = ({ kit, products = [], isOpen, onClose, onEdit, onDelete, onBuild }) => {
  if (!kit) return null;

  const kitProducts = kit.productIds
    ? products.filter(p => kit.productIds.includes(p.id))
    : [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={kit.name}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="font-medium text-gray-500">Price</dt>
            <dd className="mt-1 text-gray-900 font-semibold text-lg">{kit.price}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Period</dt>
            <dd className="mt-1 text-gray-900">{kit.period || 'prototype only'}</dd>
          </div>
          <div className="col-span-2">
            <dt className="font-medium text-gray-500">Perfect For</dt>
            <dd className="mt-1 text-gray-900">{kit.perfectFor || 'N/A'}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Popular</dt>
            <dd className="mt-1">
              {kit.popular ? (
                <span className="text-yellow-600">Yes</span>
              ) : (
                <span className="text-gray-400">No</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Products</dt>
            <dd className="mt-1 text-gray-900">{kitProducts.length} items</dd>
          </div>
        </div>

        {kit.description && (
          <div>
            <dt className="font-medium text-gray-500 mb-2">Description</dt>
            <dd className="text-gray-900">{kit.description}</dd>
          </div>
        )}

        {kitProducts.length > 0 && (
          <div>
            <dt className="font-medium text-gray-500 mb-2">Products in Kit</dt>
            <dd className="mt-1">
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {kitProducts.map((product) => (
                  <li key={product.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium text-gray-900">{product.name}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        {product.brand} {product.model} {product.size}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      £{product.price?.toFixed(2) || '0.00'}
                    </span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        )}

        {kit.features && kit.features.length > 0 && (
          <div>
            <dt className="font-medium text-gray-500 mb-2">Features</dt>
            <dd className="mt-1">
              <ul className="list-disc list-inside space-y-1 text-gray-900">
                {kit.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </dd>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <Button variant="outline" onClick={onClose}>Close</Button>
        {onEdit && (
          <Button variant="secondary" onClick={() => { onEdit(kit); onClose(); }}>Edit Details</Button>
        )}
        {onBuild && (
          <Button variant="primary" onClick={() => { onBuild(kit); onClose(); }}>Build Kit</Button>
        )}
        {onDelete && (
          <Button
            variant="danger"
            onClick={() => {
              if (window.confirm(`Delete ${kit.name}?`)) {
                onDelete(kit.id);
                onClose();
              }
            }}
          >
            Delete
          </Button>
        )}
      </div>
    </Modal>
  );
};
