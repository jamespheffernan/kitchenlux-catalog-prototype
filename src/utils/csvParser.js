import Papa from 'papaparse';

/**
 * Parse CSV file and extract products
 */
export const parseProductCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const errors = results.errors;
        const data = results.data.map((row, index) => {
          // Map CSV columns to product schema
          const product = {
            name: row.name || row['Product Name'] || '',
            brand: row.brand || row.Brand || '',
            model: row.model || row.Model || '',
            category: row.category || row.Category || 'tools',
            size: row.size || row.Size || '',
            specifications: row.specifications || row.Specifications || row.Spec || '',
            quantity: parseInt(row.quantity || row.Quantity || '1', 10) || 1,
            price: parseFloat(row.price || row.Price || '0', 10) || 0,
            description: row.description || row.Description || '',
            inductionCompatible: (row.inductionCompatible || row['Induction Compatible'] || 'false').toLowerCase() === 'true',
            sanitizationNotes: row.sanitizationNotes || row['Sanitization Notes'] || '',
          };

          // Validation
          const validationErrors = [];
          if (!product.name) validationErrors.push(`Row ${index + 2}: Missing name`);
          if (!product.brand) validationErrors.push(`Row ${index + 2}: Missing brand`);
          if (product.price < 0) validationErrors.push(`Row ${index + 2}: Invalid price`);

          return { product, errors: validationErrors };
        });

        const allErrors = data.flatMap(d => d.errors).concat(
          errors.map(e => `Parse error: ${e.message} at row ${e.row}`)
        );

        const products = data.map(d => d.product).filter(p => p.name);

        resolve({
          products,
          errors: allErrors
        });
      },
      error: (error) => {
        reject(new Error(`CSV parse error: ${error.message}`));
      }
    });
  });
};

/**
 * Parse CSV file for kits
 */
export const parseKitCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const errors = results.errors;
        const data = results.data.map((row, index) => {
          const kit = {
            name: row.name || row['Kit Name'] || '',
            price: row.price || row.Price || '',
            period: row.period || row.Period || 'prototype only',
            description: row.description || row.Description || '',
            perfectFor: row.perfectFor || row['Perfect For'] || '',
            popular: (row.popular || row.Popular || 'false').toLowerCase() === 'true',
            productIds: (row.productIds || row['Product IDs'] || '').split(',').map(id => id.trim()).filter(Boolean),
            features: (row.features || row.Features || '').split('|').map(f => f.trim()).filter(Boolean),
          };

          const validationErrors = [];
          if (!kit.name) validationErrors.push(`Row ${index + 2}: Missing kit name`);
          if (!kit.price) validationErrors.push(`Row ${index + 2}: Missing price`);

          return { kit, errors: validationErrors };
        });

        const allErrors = data.flatMap(d => d.errors).concat(
          errors.map(e => `Parse error: ${e.message} at row ${e.row}`)
        );

        const kits = data.map(d => d.kit).filter(k => k.name);

        resolve({
          kits,
          errors: allErrors
        });
      },
      error: (error) => {
        reject(new Error(`CSV parse error: ${error.message}`));
      }
    });
  });
};
