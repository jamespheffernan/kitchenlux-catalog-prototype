import { useState, useEffect, useCallback } from 'react';
import { fetchCatalog, saveCatalog } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load catalog on mount
  useEffect(() => {
    loadCatalog();
  }, []);

  const loadCatalog = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCatalog();
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load catalog:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveCatalogData = async (updatedCatalog) => {
    try {
      await saveCatalog(updatedCatalog);
      setProducts(updatedCatalog.products || []);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const addProduct = async (productData) => {
    const newProduct = {
      id: uuidv4(),
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const latestCatalog = await fetchCatalog();
    const updatedCatalog = {
      ...latestCatalog,
      products: [...(latestCatalog.products || []), newProduct],
      version: latestCatalog.version || "1.0.0"
    };

    await saveCatalogData(updatedCatalog);
    return newProduct;
  };

  const updateProduct = async (id, productData) => {
    const latestCatalog = await fetchCatalog();
    const updatedProducts = (latestCatalog.products || []).map(p =>
      p.id === id
        ? { ...p, ...productData, updatedAt: new Date().toISOString() }
        : p
    );

    const updatedCatalog = {
      ...latestCatalog,
      products: updatedProducts,
      version: latestCatalog.version || "1.0.0"
    };

    await saveCatalogData(updatedCatalog);
    return updatedProducts.find(p => p.id === id);
  };

  const deleteProduct = async (id) => {
    const latestCatalog = await fetchCatalog();
    const updatedProducts = (latestCatalog.products || []).filter(p => p.id !== id);

    // Also remove from any kits that reference this product
    const updatedKits = (latestCatalog.kits || []).map(kit => ({
      ...kit,
      productIds: kit.productIds?.filter(pid => pid !== id) || []
    }));

    const updatedCatalog = {
      ...latestCatalog,
      products: updatedProducts,
      kits: updatedKits,
      version: latestCatalog.version || "1.0.0"
    };

    await saveCatalogData(updatedCatalog);
  };

  const getProduct = useCallback((id) => {
    return products.find(p => p.id === id);
  }, [products]);

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    reload: loadCatalog
  };
};
