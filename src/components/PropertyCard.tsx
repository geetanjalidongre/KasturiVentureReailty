import React from 'react';
import { MapPin } from 'lucide-react';

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
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group animate-on-scroll"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-kasturi-gold text-white px-3 py-1 rounded-full text-sm font-medium transform transition-all duration-300 group-hover:scale-110">
          {property.type}
        </div>
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
          {property.price}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-kasturi-gold transition-colors duration-300">
          {property.title}
        </h3>
        <p className="text-gray-600 mb-4 flex items-center">
          <MapPin className="w-4 h-4 mr-1 text-kasturi-gold" />
          {property.location}
        </p>
        
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span className="flex items-center">
            <span className="w-2 h-2 bg-kasturi-gold rounded-full mr-2"></span>
            {property.beds} Beds
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 bg-kasturi-gold rounded-full mr-2"></span>
            {property.baths} Baths
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 bg-kasturi-gold rounded-full mr-2"></span>
            {property.sqft} sqft
          </span>
        </div>
        
        <button className="w-full bg-kasturi-gold text-white py-2 rounded-lg hover:bg-kasturi-gold-dark transition-all duration-300 font-medium transform hover:scale-105 active:scale-95">
          View Details
        </button>
      </div>
    </div>
  );
};