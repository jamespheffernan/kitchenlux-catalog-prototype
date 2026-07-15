import { useState, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductGrid } from '../components/products/ProductGrid';
import { ProductDetail } from '../components/products/ProductDetail';
import { ProductForm } from '../components/products/ProductForm';
import { ProductFilters } from '../components/products/ProductFilters';
import { Button } from '../components/shared/Button';

export const ProductsPage = () => {
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');

  // Get unique categories and brands for filters
  const categories = useMemo(() => {
    return [...new Set(products.map(p => p.category).filter(Boolean))].sort();
  }, [products]);

  const brands = useMemo(() => {
    return [...new Set(products.map(p => p.brand).filter(Boolean))].sort();
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesSearch =
          product.name?.toLowerCase().includes(searchLower) ||
          product.brand?.toLowerCase().includes(searchLower) ||
          product.model?.toLowerCase().includes(searchLower) ||
          product.category?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }
      if (categoryFilter && product.category !== categoryFilter) return false;
      if (brandFilter && product.brand !== brandFilter) return false;
      return true;
    });
  }, [products, search, categoryFilter, brandFilter]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      if (selectedProduct?.id === id) {
        setIsDetailOpen(false);
        setSelectedProduct(null);
      }
    } catch (error) {
      alert(`Failed to delete product: ${error.message}`);
    }
  };

  const handleFormSubmit = async (productData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await addProduct(productData);
      }
      setIsFormOpen(false);
      setEditingProduct(null);
    } catch (error) {
      alert(`Failed to ${editingProduct ? 'update' : 'create'} product: ${error.message}`);
    }
  };

  const handleNewProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your product catalog ({filteredProducts.length} of {products.length})
          </p>
        </div>
        <Button variant="primary" onClick={handleNewProduct}>
          + Add Product
        </Button>
      </div>

      <ProductFilters
        search={search}
        onSearchChange={setSearch}
        category={categoryFilter}
        onCategoryChange={setCategoryFilter}
        brand={brandFilter}
        onBrandChange={setBrandFilter}
        categories={categories}
        brands={brands}
      />

      {!loading && products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a new product.</p>
          <div className="mt-6">
            <Button variant="primary" onClick={handleNewProduct}>
              Add Product
            </Button>
          </div>
        </div>
      ) : (
        <ProductGrid
          products={filteredProducts}
          loading={loading}
          onProductClick={handleProductClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <ProductDetail
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedProduct(null);
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductForm
        product={editingProduct}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};
