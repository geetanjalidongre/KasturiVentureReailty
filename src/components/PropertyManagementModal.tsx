import React, { useState } from 'react';
import { X, Plus, Trash2, AlertCircle } from 'lucide-react';
import { Property, propertyService } from '../lib/supabase';
import { FloatingLabelInput, FloatingLabelTextarea } from './FloatingLabels';

interface PropertyManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPropertyChange: () => void;
}

export const PropertyManagementModal: React.FC<PropertyManagementModalProps> = ({
  isOpen,
  onClose,
  onPropertyChange
}) => {
  const [mode, setMode] = useState<'list' | 'add'>('list');
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [newProperty, setNewProperty] = useState({
    title: '',
    description: '',
    property_type: 'Residential',
    location: '',
    price_display: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    featured: false,
    images: [] as string[],
    imageInput: ''
  });

  React.useEffect(() => {
    if (isOpen) {
      loadProperties();
    }
  }, [isOpen]);

  const loadProperties = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await propertyService.getAllProperties();
      setProperties(data);
    } catch (err: any) {
      setError('Failed to load properties: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const propertyData: any = {
        title: newProperty.title,
        description: newProperty.description,
        property_type: newProperty.property_type,
        location: newProperty.location,
        price_display: newProperty.price_display,
        featured: newProperty.featured,
        images: newProperty.images
      };

      if (newProperty.price) propertyData.price = parseFloat(newProperty.price);
      if (newProperty.bedrooms) propertyData.bedrooms = parseInt(newProperty.bedrooms);
      if (newProperty.bathrooms) propertyData.bathrooms = parseInt(newProperty.bathrooms);
      if (newProperty.sqft) propertyData.sqft = parseFloat(newProperty.sqft);

      await propertyService.createProperty(propertyData);

      setSuccess('Property added successfully!');
      setNewProperty({
        title: '',
        description: '',
        property_type: 'Residential',
        location: '',
        price_display: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        sqft: '',
        featured: false,
        images: [],
        imageInput: ''
      });

      await loadProperties();
      onPropertyChange();

      setTimeout(() => {
        setMode('list');
        setSuccess(null);
      }, 2000);
    } catch (err: any) {
      setError('Failed to add property: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    setIsLoading(true);
    setError(null);
    try {
      await propertyService.deleteProperty(id);
      await loadProperties();
      onPropertyChange();
      setSuccess('Property deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError('Failed to delete property: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddImage = () => {
    if (newProperty.imageInput.trim()) {
      setNewProperty({
        ...newProperty,
        images: [...newProperty.images, newProperty.imageInput.trim()],
        imageInput: ''
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setNewProperty({
      ...newProperty,
      images: newProperty.images.filter((_, i) => i !== index)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-zoom-in">
        <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center">
            {mode === 'list' ? 'Manage Properties' : 'Add New Property'}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 animate-zoom-in">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start space-x-3 animate-zoom-in">
              <AlertCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-green-700">{success}</p>
            </div>
          )}

          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setMode('list')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                mode === 'list'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Property List
            </button>
            <button
              onClick={() => setMode('add')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center ${
                mode === 'add'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Property
            </button>
          </div>

          {mode === 'list' ? (
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : properties.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No properties found</p>
                </div>
              ) : (
                properties.map((property) => (
                  <div
                    key={property.id}
                    className="bg-gray-50 rounded-xl p-4 flex items-start space-x-4 hover:shadow-lg transition-all"
                  >
                    <img
                      src={
                        property.images && Array.isArray(property.images) && property.images.length > 0
                          ? (property.images[0].startsWith('http') ? property.images[0] : `/${property.images[0]}`)
                          : 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
                      }
                      alt={property.title}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 truncate">{property.title}</h3>
                      <p className="text-sm text-gray-600 truncate">{property.location}</p>
                      <p className="text-amber-600 font-semibold mt-1">{property.price_display}</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                        {property.property_type}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteProperty(property.id)}
                      disabled={isLoading}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          ) : (
            <form onSubmit={handleAddProperty} className="space-y-6">
              <FloatingLabelInput
                label="Property Title"
                type="text"
                value={newProperty.title}
                onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
                required
              />

              <FloatingLabelTextarea
                label="Description"
                value={newProperty.description}
                onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
                rows={3}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <select
                    value={newProperty.property_type}
                    onChange={(e) => setNewProperty({ ...newProperty, property_type: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                  </select>
                </div>

                <FloatingLabelInput
                  label="Price Display (e.g., ₹2.5 Cr)"
                  type="text"
                  value={newProperty.price_display}
                  onChange={(e) => setNewProperty({ ...newProperty, price_display: e.target.value })}
                  required
                />
              </div>

              <FloatingLabelInput
                label="Location"
                type="text"
                value={newProperty.location}
                onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <FloatingLabelInput
                  label="Price (optional)"
                  type="number"
                  value={newProperty.price}
                  onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
                />

                <FloatingLabelInput
                  label="Area (sqft)"
                  type="number"
                  value={newProperty.sqft}
                  onChange={(e) => setNewProperty({ ...newProperty, sqft: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FloatingLabelInput
                  label="Bedrooms"
                  type="number"
                  value={newProperty.bedrooms}
                  onChange={(e) => setNewProperty({ ...newProperty, bedrooms: e.target.value })}
                />

                <FloatingLabelInput
                  label="Bathrooms"
                  type="number"
                  value={newProperty.bathrooms}
                  onChange={(e) => setNewProperty({ ...newProperty, bathrooms: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Images</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newProperty.imageInput}
                    onChange={(e) => setNewProperty({ ...newProperty, imageInput: e.target.value })}
                    placeholder="Image filename (e.g., property1.jpg)"
                    className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="bg-amber-500 text-white px-4 py-3 rounded-xl hover:bg-amber-600 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {newProperty.images.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {newProperty.images.map((img, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                        <span className="text-sm text-gray-700 truncate flex-1">{img}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="text-red-500 hover:bg-red-50 p-1 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={newProperty.featured}
                  onChange={(e) => setNewProperty({ ...newProperty, featured: e.target.checked })}
                  className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500"
                />
                <label htmlFor="featured" className="text-gray-700 font-medium">
                  Mark as Featured Property
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-4 rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Adding Property...' : 'Add Property'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
