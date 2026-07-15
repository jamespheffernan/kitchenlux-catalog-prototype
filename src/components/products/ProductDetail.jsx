import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';

export const ProductDetail = ({ product, isOpen, onClose, onEdit, onDelete }) => {
  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product.name}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="font-medium text-gray-500">Brand</dt>
            <dd className="mt-1 text-gray-900">{product.brand || 'N/A'}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Model</dt>
            <dd className="mt-1 text-gray-900">{product.model || 'N/A'}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Category</dt>
            <dd className="mt-1 text-gray-900">{product.category || 'N/A'}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Size</dt>
            <dd className="mt-1 text-gray-900">{product.size || 'N/A'}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Quantity</dt>
            <dd className="mt-1 text-gray-900">{product.quantity || 1}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Price</dt>
            <dd className="mt-1 text-gray-900 font-semibold">£{product.price?.toFixed(2) || '0.00'}</dd>
          </div>
          {product.inductionCompatible !== undefined && (
            <div>
              <dt className="font-medium text-gray-500">Induction Compatible</dt>
              <dd className="mt-1">
                {product.inductionCompatible ? (
                  <span className="text-green-600">Yes</span>
                ) : (
                  <span className="text-gray-400">No</span>
                )}
              </dd>
            </div>
          )}
        </div>

        {product.specifications && (
          <div>
            <dt className="font-medium text-gray-500">Specifications</dt>
            <dd className="mt-1 text-gray-900">{product.specifications}</dd>
          </div>
        )}

        {product.description && (
          <div>
            <dt className="font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-gray-900">{product.description}</dd>
          </div>
        )}

        {product.sanitizationNotes && (
          <div>
            <dt className="font-medium text-gray-500">Sanitization Notes</dt>
            <dd className="mt-1 text-gray-900">{product.sanitizationNotes}</dd>
          </div>
        )}

      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <Button variant="outline" onClick={onClose}>Close</Button>
        {onEdit && <Button variant="primary" onClick={() => { onEdit(product); onClose(); }}>Edit</Button>}
        {onDelete && (
          <Button
            variant="danger"
            onClick={() => {
              if (window.confirm(`Delete ${product.name}?`)) {
                onDelete(product.id);
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
