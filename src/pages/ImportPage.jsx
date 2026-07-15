import { useProducts } from '../hooks/useProducts';
import { useKits } from '../hooks/useKits';
import { CSVUpload } from '../components/import/CSVUpload';
import { CSVExport } from '../components/import/CSVExport';

export const ImportPage = () => {
  const { products, addProduct, reload: reloadProducts } = useProducts();
  const { kits, addKit, reload: reloadKits, catalog } = useKits();

  const handleProductsImport = async (importedProducts) => {
    try {
      for (const product of importedProducts) {
        await addProduct(product);
      }
      alert(`Successfully imported ${importedProducts.length} products!`);
      await reloadProducts();
    } catch (error) {
      alert(`Failed to import products: ${error.message}`);
    }
  };

  const handleKitsImport = async (importedKits) => {
    try {
      for (const kit of importedKits) {
        await addKit(kit);
      }
      alert(`Successfully imported ${importedKits.length} kits!`);
      await reloadKits();
    } catch (error) {
      alert(`Failed to import kits: ${error.message}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Import / Export</h1>
        <p className="mt-1 text-sm text-gray-500">
          Import products and kits from CSV, or export your catalog data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <CSVUpload
            onProductsImport={handleProductsImport}
            onKitsImport={handleKitsImport}
          />
        </div>

        <div>
          <CSVExport
            products={products}
            kits={kits}
            catalog={catalog}
          />
        </div>
      </div>

      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">How to Use</h2>
        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Importing Products/Kits</h3>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Download a CSV template to see the required format</li>
              <li>Fill in your product or kit data in Excel, Google Sheets, or similar</li>
              <li>Save as CSV format</li>
              <li>Upload the CSV file using the import section above</li>
              <li>Review the preview and confirm the import</li>
            </ol>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Exporting Data</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>CSV Export:</strong> Export products or kits as CSV for editing in spreadsheet applications</li>
              <li><strong>JSON Export:</strong> Export full catalog for backup or migration to a database/API</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
