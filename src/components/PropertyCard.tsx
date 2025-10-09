import React from 'react';
import { MapPin, Bed, Bath, Square, Heart, Eye, Share2 } from 'lucide-react';

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    price: string;
    location: string;
    beds: string | number;
    baths: string | number;
    sqft: string;
    image: string;
    type: string;
  };
  index: number;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, index }) => {
  return (
    <div className="property-card group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-amber-200">
      <div className="relative overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="property-image w-full h-56 object-cover transition-transform duration-700"
        />
        
        {/* Property Type Badge */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg transform group-hover:scale-110 transition-transform duration-300">
          {property.type}
        </div>
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          {property.price}
        </div>
        
        {/* Action Buttons */}
        <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-red-500 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110">
            <Heart className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-blue-500 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110">
            <Eye className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-green-500 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2">
          {property.title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-2 text-amber-500 flex-shrink-0" />
          <span className="text-sm truncate">{property.location}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6 text-sm text-gray-600">
          <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg group-hover:bg-amber-50 transition-colors duration-300">
            <Bed className="w-4 h-4 mr-2 text-amber-500" />
            <span className="font-medium">{property.beds}</span>
          </div>
          <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg group-hover:bg-amber-50 transition-colors duration-300">
            <Bath className="w-4 h-4 mr-2 text-amber-500" />
            <span className="font-medium">{property.baths}</span>
          </div>
          <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg group-hover:bg-amber-50 transition-colors duration-300">
            <Square className="w-4 h-4 mr-2 text-amber-500" />
            <span className="font-medium">{property.sqft}</span>
          </div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-3 rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
          View Details
        </button>
      </div>
    </div>
  );
};