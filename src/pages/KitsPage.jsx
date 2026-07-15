import { useState } from 'react';
import { useKits } from '../hooks/useKits';
import { useProducts } from '../hooks/useProducts';
import { KitGrid } from '../components/kits/KitGrid';
import { KitDetail } from '../components/kits/KitDetail';
import { KitForm } from '../components/kits/KitForm';
import { KitBuilder } from '../components/kits/KitBuilder';
import { Button } from '../components/shared/Button';

export const KitsPage = () => {
  const { kits, loading: kitsLoading, addKit, updateKit, deleteKit, updateKitProducts } = useKits();
  const { products } = useProducts();
  const [selectedKit, setSelectedKit] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [editingKit, setEditingKit] = useState(null);

  const handleKitClick = (kit) => {
    setSelectedKit(kit);
    setIsDetailOpen(true);
  };

  const handleEdit = (kit) => {
    setEditingKit(kit);
    setIsFormOpen(true);
  };

  const handleBuild = (kit) => {
    setEditingKit(kit);
    setIsBuilderOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteKit(id);
      if (selectedKit?.id === id) {
        setIsDetailOpen(false);
        setSelectedKit(null);
      }
    } catch (error) {
      alert(`Failed to delete kit: ${error.message}`);
    }
  };

  const handleFormSubmit = async (kitData) => {
    try {
      if (editingKit) {
        await updateKit(editingKit.id, kitData);
      } else {
        await addKit(kitData);
      }
      setIsFormOpen(false);
      setEditingKit(null);
    } catch (error) {
      alert(`Failed to ${editingKit ? 'update' : 'create'} kit: ${error.message}`);
    }
  };

  const handleBuilderSave = async (productIds) => {
    try {
      if (editingKit) {
        await updateKitProducts(editingKit.id, productIds);
      }
      setIsBuilderOpen(false);
      setEditingKit(null);
    } catch (error) {
      alert(`Failed to update kit: ${error.message}`);
    }
  };

  const handleNewKit = () => {
    setEditingKit(null);
    setIsFormOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kits</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your kit configurations ({kits.length} kits)
          </p>
        </div>
        <Button variant="primary" onClick={handleNewKit}>
          + Create Kit
        </Button>
      </div>

      {!kitsLoading && kits.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No kits</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new kit.</p>
          <div className="mt-6">
            <Button variant="primary" onClick={handleNewKit}>
              Create Kit
            </Button>
          </div>
        </div>
      ) : (
        <KitGrid
          kits={kits}
          products={products}
          loading={kitsLoading}
          onKitClick={handleKitClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <KitDetail
        kit={selectedKit}
        products={products}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedKit(null);
        }}
        onEdit={(kit) => {
          setEditingKit(kit);
          setIsDetailOpen(false);
          setIsFormOpen(true);
        }}
        onBuild={handleBuild}
        onDelete={handleDelete}
      />

      <KitForm
        kit={editingKit}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingKit(null);
        }}
        onSubmit={handleFormSubmit}
      />

      {editingKit && (
        <KitBuilder
          kit={editingKit}
          products={products}
          isOpen={isBuilderOpen}
          onClose={() => {
            setIsBuilderOpen(false);
            setEditingKit(null);
          }}
          onSave={handleBuilderSave}
        />
      )}

      {kits.length > 0 && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Click on a kit to view details, then click "Edit" to modify products using drag-and-drop.
          </p>
        </div>
      )}
    </div>
  );
};
