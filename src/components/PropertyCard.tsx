import React from 'react';
import { MapPin, Bed, Bath, Maximize, Eye } from 'lucide-react';
import { Property } from '../lib/supabase';

interface PropertyCardProps {
  property: Property;
  onViewDetails?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewDetails }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
            {property.title}
          </h3>
          <span className="text-lg font-bold text-amber-600 whitespace-nowrap ml-2">
            {property.price_display || (property.price ? `₹${property.price.toLocaleString()}` : 'Contact')}
          </span>
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-semibold inline-block mb-4">
          {property.property_type}
        </div>

        {property.description && (
          <p className="text-gray-600 mb-4">{property.description}</p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          {property.bedrooms && (
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span>{property.bedrooms} Beds</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span>{property.bathrooms} Baths</span>
            </div>
          )}
          {(property.sqft || property.area) && (
            <div className="flex items-center">
              <Maximize className="w-4 h-4 mr-1" />
              <span>{property.sqft || property.area} sqft</span>
            </div>
          )}
        </div>

        <button
          onClick={() => onViewDetails?.(property)}
          className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-3 rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 font-semibold flex items-center justify-center group"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </button>
      </div>
    </div>
  );
};
