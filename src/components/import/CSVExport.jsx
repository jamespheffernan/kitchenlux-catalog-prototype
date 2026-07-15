import { generateProductCSV, generateKitCSV, downloadCSV, generateProductCSVTemplate, generateKitCSVTemplate } from '../../utils/csvGenerator';
import { exportCatalogAsJSON } from '../../utils/storage';
import { Button } from '../shared/Button';

export const CSVExport = ({ products, kits, catalog }) => {
  const handleExportProducts = () => {
    const csv = generateProductCSV(products);
    downloadCSV(csv, `catalog-products-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const handleExportKits = () => {
    const csv = generateKitCSV(kits);
    downloadCSV(csv, `catalog-kits-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const handleExportJSON = () => {
    if (catalog) {
      exportCatalogAsJSON(catalog);
    }
  };

  const handleDownloadProductTemplate = () => {
    const csv = generateProductCSVTemplate();
    downloadCSV(csv, 'catalog-products-template.csv');
  };

  const handleDownloadKitTemplate = () => {
    const csv = generateKitCSVTemplate();
    downloadCSV(csv, 'catalog-kits-template.csv');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Export Data</h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Export as CSV</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={handleExportProducts}>
              Export Products ({products.length})
            </Button>
            <Button variant="primary" onClick={handleExportKits}>
              Export Kits ({kits.length})
            </Button>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Export as JSON</h3>
          <p className="text-sm text-gray-600 mb-3">
            Export full catalog data for backup or migration to API/database.
          </p>
          <Button variant="secondary" onClick={handleExportJSON}>
            Export Full Catalog (JSON)
          </Button>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Download Templates</h3>
          <p className="text-sm text-gray-600 mb-3">
            Download CSV templates to prepare data for bulk import.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={handleDownloadProductTemplate}>
              Products Template
            </Button>
            <Button variant="outline" onClick={handleDownloadKitTemplate}>
              Kits Template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
