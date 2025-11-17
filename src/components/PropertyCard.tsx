import React from 'react';
import { MapPin, Bed, Bath, Maximize, Eye, Heart, Share2 } from 'lucide-react';
import { Property } from '../lib/supabase';

interface PropertyCardProps {
  property: Property;
  onViewDetails?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewDetails }) => {
  const [imgError, setImgError] = React.useState(false);

  const getImageUrl = () => {
    if (imgError) {
      return 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg';
    }
    if (property.images && Array.isArray(property.images) && property.images.length > 0) {
      const firstImage = property.images[0];
      return firstImage.startsWith('http') ? firstImage : `/${firstImage}`;
    }
    return 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group h-full flex flex-col">
      <div className="relative overflow-hidden h-64 flex-shrink-0">
        <img
          src={getImageUrl()}
          alt={property.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
          {property.property_type}
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-amber-500 hover:text-white transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-amber-500 hover:text-white transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors uppercase">
            {property.title}
          </h3>
          <span className="text-lg font-bold text-amber-600 whitespace-nowrap ml-2">
            {property.price_display || (property.price ? `₹${property.price.toLocaleString()}` : 'Contact')}
          </span>
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{property.location}</span>
        </div>

        {property.description && (
          <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{property.description}</p>
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
          className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-3 rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 font-semibold flex items-center justify-center group mt-auto"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </button>
      </div>
    </div>
  );
};
