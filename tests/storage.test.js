import assert from 'node:assert/strict';
import test from 'node:test';

import { fetchCatalog, resetCatalog, saveCatalog } from '../src/utils/storage.js';

test('first use returns fictional sample products and kits', async () => {
  const catalog = await resetCatalog();

  assert.equal(catalog.products.length, 6);
  assert.equal(catalog.kits.length, 2);
  assert.ok(catalog.products.every((product) => product.priceUrl === '' && product.imageUrl === ''));
  assert.ok(catalog.products.every((product) => {
    const description = product.description.toLowerCase();
    return description.includes('synthetic') || description.includes('fictional');
  }));
});

test('saved catalogs are cloned and receive an updated timestamp', async () => {
  const catalog = await resetCatalog();
  catalog.products[0].name = 'Edited in test';

  const result = await saveCatalog(catalog);
  catalog.products[0].name = 'Changed after save';
  const loaded = await fetchCatalog();

  assert.equal(result.success, true);
  assert.equal(loaded.products[0].name, 'Edited in test');
  assert.notEqual(loaded.lastUpdated, null);
});

test('invalid catalog shapes are rejected', async () => {
  await assert.rejects(() => saveCatalog({ products: [] }), /products and kits arrays/);
});
