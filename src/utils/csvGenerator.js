import Papa from 'papaparse';

/**
 * Generate CSV content for products
 */
export const generateProductCSV = (products) => {
  const columns = [
    'name',
    'brand',
    'model',
    'category',
    'size',
    'specifications',
    'quantity',
    'price',
    'description',
    'inductionCompatible',
    'sanitizationNotes'
  ];

  const data = products.map(product => [
    product.name || '',
    product.brand || '',
    product.model || '',
    product.category || '',
    product.size || '',
    product.specifications || '',
    product.quantity || 1,
    product.price || 0,
    product.description || '',
    product.inductionCompatible ? 'true' : 'false',
    product.sanitizationNotes || ''
  ]);

  return Papa.unparse({
    fields: columns,
    data: data
  });
};

/**
 * Generate CSV content for kits
 */
export const generateKitCSV = (kits) => {
  const columns = [
    'name',
    'price',
    'period',
    'description',
    'perfectFor',
    'popular',
    'productIds',
    'features'
  ];

  const data = kits.map(kit => [
    kit.name || '',
    kit.price || '',
    kit.period || 'prototype only',
    kit.description || '',
    kit.perfectFor || '',
    kit.popular ? 'true' : 'false',
    (kit.productIds || []).join(','),
    (kit.features || []).join('|')
  ]);

  return Papa.unparse({
    fields: columns,
    data: data
  });
};

/**
 * Download CSV file
 */
export const downloadCSV = (content, filename) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Generate product CSV template
 */
export const generateProductCSVTemplate = () => {
  const columns = [
    'name',
    'brand',
    'model',
    'category',
    'size',
    'specifications',
    'quantity',
    'price',
    'description',
    'inductionCompatible',
    'sanitizationNotes'
  ];

  return Papa.unparse({
    fields: columns,
    data: []
  });
};

/**
 * Generate kit CSV template
 */
export const generateKitCSVTemplate = () => {
  const columns = [
    'name',
    'price',
    'period',
    'description',
    'perfectFor',
    'popular',
    'productIds',
    'features'
  ];

  return Papa.unparse({
    fields: columns,
    data: []
  });
};
