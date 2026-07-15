import { useState, useEffect, useCallback } from 'react';
import { fetchCatalog, saveCatalog } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

export const useKits = () => {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [catalog, setCatalog] = useState(null);

  // Load catalog on mount
  useEffect(() => {
    loadCatalog();
  }, []);

  const loadCatalog = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCatalog();
      setCatalog(data);
      setKits(data.kits || []);
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
      setCatalog(updatedCatalog);
      setKits(updatedCatalog.kits || []);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const addKit = async (kitData) => {
    const newKit = {
      id: uuidv4(),
      productIds: kitData.productIds || [],
      features: kitData.features || [],
      popular: kitData.popular || false,
      ...kitData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const latestCatalog = await fetchCatalog();
    const updatedCatalog = {
      ...latestCatalog,
      kits: [...(latestCatalog.kits || []), newKit],
      version: latestCatalog.version || "1.0.0"
    };

    await saveCatalogData(updatedCatalog);
    return newKit;
  };

  const updateKit = async (id, kitData) => {
    const latestCatalog = await fetchCatalog();
    const updatedKits = (latestCatalog.kits || []).map(k =>
      k.id === id
        ? { ...k, ...kitData, updatedAt: new Date().toISOString() }
        : k
    );

    const updatedCatalog = {
      ...latestCatalog,
      kits: updatedKits,
      version: latestCatalog.version || "1.0.0"
    };

    await saveCatalogData(updatedCatalog);
    return updatedKits.find(k => k.id === id);
  };

  const deleteKit = async (id) => {
    const latestCatalog = await fetchCatalog();
    const updatedKits = (latestCatalog.kits || []).filter(k => k.id !== id);

    const updatedCatalog = {
      ...latestCatalog,
      kits: updatedKits,
      version: latestCatalog.version || "1.0.0"
    };

    await saveCatalogData(updatedCatalog);
  };

  const updateKitProducts = async (kitId, productIds) => {
    const latestCatalog = await fetchCatalog();
    const updatedKits = (latestCatalog.kits || []).map(k =>
      k.id === kitId
        ? { ...k, productIds, updatedAt: new Date().toISOString() }
        : k
    );

    const updatedCatalog = {
      ...latestCatalog,
      kits: updatedKits,
      version: latestCatalog.version || "1.0.0"
    };

    await saveCatalogData(updatedCatalog);
    return updatedKits.find(k => k.id === kitId);
  };

  const getKit = useCallback((id) => {
    return kits.find(k => k.id === id);
  }, [kits]);

  return {
    kits,
    loading,
    error,
    addKit,
    updateKit,
    deleteKit,
    updateKitProducts,
    getKit,
    reload: loadCatalog,
    catalog // Expose full catalog for products relationship
  };
};
