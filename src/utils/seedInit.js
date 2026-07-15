/**
 * Utility to restore the fictional sample catalog
 * This can be called from the browser console or added as a button in the UI
 */

import { generateSeedData } from '../data/seedData';
import { saveCatalog } from './storage';

/**
 * Initialize catalog with seed data
 * Call this from browser console: window.seedCatalog()
 */
export const seedCatalog = async () => {
  try {
    if (window.confirm("Replace this browser's catalog with fictional sample data?")) {
      const seedData = generateSeedData();
      await saveCatalog(seedData);
      alert(`Restored ${seedData.products.length} sample products and ${seedData.kits.length} sample kits.`);
      window.location.reload();
    }
  } catch (error) {
    console.error('Failed to seed catalog:', error);
    alert(`Failed to seed catalog: ${error.message}`);
  }
};

// Make available globally for easy access
if (typeof window !== 'undefined') {
  window.seedCatalog = seedCatalog;
}
