import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';

export const KitForm = ({ kit, isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: kit || {
      name: '',
      price: '',
      period: 'prototype only',
      description: '',
      perfectFor: '',
      popular: false
    }
  });

  useEffect(() => {
    if (kit) {
      reset(kit);
    } else {
      reset({
        name: '',
        price: '',
        period: 'prototype only',
        description: '',
        perfectFor: '',
        popular: false
      });
    }
  }, [kit, reset, isOpen]);

  const onSubmitForm = (data) => {
    onSubmit({
      ...data,
      popular: data.popular === true || data.popular === 'true'
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={kit ? 'Edit Kit' : 'Create Kit'}
    >
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('price', { required: 'Price is required' })}
              placeholder="£99 sample price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
            <input
              type="text"
              {...register('period')}
              placeholder="prototype only"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Perfect For</label>
          <input
            type="text"
            {...register('perfectFor')}
            placeholder="Perfect for families and casual cooks"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('popular')}
            id="popular"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="popular" className="ml-2 block text-sm text-gray-900">
            Mark as Popular
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">{kit ? 'Update' : 'Create'} Kit</Button>
        </div>
      </form>
    </Modal>
  );
};
