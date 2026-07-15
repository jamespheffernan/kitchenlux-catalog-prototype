import { useState } from 'react';
import { parseProductCSV, parseKitCSV } from '../../utils/csvParser';
import { Button } from '../shared/Button';
import { Modal } from '../shared/Modal';

export const CSVUpload = ({ onProductsImport, onKitsImport }) => {
  const [uploadType, setUploadType] = useState('products');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setErrors([]);

    try {
      if (uploadType === 'products') {
        const result = await parseProductCSV(file);
        if (result.errors.length > 0) {
          setErrors(result.errors);
        }
        if (result.products.length > 0) {
          setPreviewData({ type: 'products', data: result.products, errors: result.errors });
          setIsPreviewOpen(true);
        }
      } else {
        const result = await parseKitCSV(file);
        if (result.errors.length > 0) {
          setErrors(result.errors);
        }
        if (result.kits.length > 0) {
          setPreviewData({ type: 'kits', data: result.kits, errors: result.errors });
          setIsPreviewOpen(true);
        }
      }
    } catch (error) {
      setErrors([error.message]);
    } finally {
      setLoading(false);
      event.target.value = ''; // Reset file input
    }
  };

  const handleConfirmImport = () => {
    if (!previewData) return;

    if (previewData.type === 'products') {
      onProductsImport(previewData.data);
    } else {
      onKitsImport(previewData.data);
    }

    setIsPreviewOpen(false);
    setPreviewData(null);
    setErrors([]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Import CSV</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Import Type
          </label>
          <select
            value={uploadType}
            onChange={(e) => setUploadType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="products">Products</option>
            <option value="kits">Kits</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CSV File
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="csv-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="csv-upload"
                    name="csv-upload"
                    type="file"
                    className="sr-only"
                    accept=".csv"
                    onChange={handleFileUpload}
                    disabled={loading}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">CSV files only</p>
            </div>
          </div>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <h3 className="text-sm font-medium text-red-800 mb-2">Errors:</h3>
            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {loading && (
          <div className="text-center text-gray-500">Processing CSV...</div>
        )}
      </div>

      <Modal
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          setPreviewData(null);
        }}
        title={`Preview Import - ${previewData?.type === 'products' ? 'Products' : 'Kits'}`}
        footer={
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsPreviewOpen(false);
                setPreviewData(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirmImport}>
              Import {previewData?.data?.length || 0} {previewData?.type === 'products' ? 'Products' : 'Kits'}
            </Button>
          </div>
        }
      >
        {previewData && (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Ready to import <strong>{previewData.data.length}</strong> {previewData.type}.
            </p>
            {previewData.errors && previewData.errors.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
                <h4 className="text-sm font-medium text-yellow-800 mb-1">Warnings:</h4>
                <ul className="list-disc list-inside text-sm text-yellow-700">
                  {previewData.errors.slice(0, 5).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                  {previewData.errors.length > 5 && (
                    <li>... and {previewData.errors.length - 5} more</li>
                  )}
                </ul>
              </div>
            )}
            <div className="max-h-64 overflow-y-auto border border-gray-200 rounded p-3">
              <ul className="space-y-1 text-sm">
                {previewData.data.slice(0, 10).map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item.name || 'Untitled'}
                  </li>
                ))}
                {previewData.data.length > 10 && (
                  <li className="text-gray-500 italic">... and {previewData.data.length - 10} more</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
