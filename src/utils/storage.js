import { generateSeedData } from '../data/seedData.js';

const STORAGE_KEY = 'kitchenlux-catalog-prototype-v1';
let memoryCatalog = null;

const cloneCatalog = (catalog) => structuredClone(catalog);

const getLocalStorage = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
};

const readStoredCatalog = () => {
  const storage = getLocalStorage();
  const raw = storage?.getItem(STORAGE_KEY);

  if (raw) {
    return JSON.parse(raw);
  }

  return memoryCatalog ? cloneCatalog(memoryCatalog) : null;
};

const writeStoredCatalog = (catalog) => {
  const stored = cloneCatalog(catalog);
  const storage = getLocalStorage();

  if (storage) {
    storage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } else {
    memoryCatalog = stored;
  }
};

const validateCatalog = (catalog) => {
  if (!catalog || !Array.isArray(catalog.products) || !Array.isArray(catalog.kits)) {
    throw new TypeError('Catalog must contain products and kits arrays.');
  }
};

/**
 * Load catalog data from this browser only. The first visit starts with
 * fictional sample data so the interface is useful without a backend.
 */
export const fetchCatalog = async () => {
  const stored = readStoredCatalog();

  if (stored) {
    validateCatalog(stored);
    return cloneCatalog(stored);
  }

  const seed = generateSeedData();
  writeStoredCatalog(seed);
  return cloneCatalog(seed);
};

/** Save catalog data to localStorage. No data is sent over the network. */
export const saveCatalog = async (catalog) => {
  validateCatalog(catalog);

  const updated = {
    ...cloneCatalog(catalog),
    version: catalog.version || '1.0.0',
    lastUpdated: new Date().toISOString(),
  };

  writeStoredCatalog(updated);
  return { success: true, lastUpdated: updated.lastUpdated };
};

/** Restore the fictional sample catalog in this browser. */
export const resetCatalog = async () => {
  getLocalStorage()?.removeItem(STORAGE_KEY);
  memoryCatalog = null;
  return fetchCatalog();
};

/** Export catalog data as a local JSON download. */
export const exportCatalogAsJSON = (catalog) => {
  validateCatalog(catalog);
  const dataBlob = new Blob([JSON.stringify(catalog, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `catalog-prototype-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
