import React, { useState } from 'react';
import { Filter, ChevronDown, Search } from 'lucide-react';

export const FilterPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    propertyType: '',
    priceRange: '',
    location: '',
    bedrooms: ''
  });

  const propertyTypes = ['All', 'Villa', 'Apartment', 'Commercial', 'Plot'];
  const priceRanges = ['All', '50L - 1Cr', '1Cr - 2Cr', '2Cr - 5Cr', '5Cr+'];
  const locations = ['All', 'Banjara Hills', 'Gachibowli', 'HITEC City', 'Kompally'];
  const bedroomOptions = ['All', '1 BHK', '2 BHK', '3 BHK', '4+ BHK'];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-kasturi-gold" />
          <h3 className="text-lg font-semibold text-gray-900">Filter Properties</h3>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-kasturi-gold hover:text-kasturi-gold-dark transition-colors"
        >
          <span className="text-sm font-medium">
            {isOpen ? 'Hide Filters' : 'Show Filters'}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search properties..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kasturi-gold focus:border-transparent transition-all duration-300 transform focus:scale-105"
        />
      </div>

      {/* Filter Options */}
      <div className={`filter-panel ${isOpen ? 'open' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
            <select
              value={filters.propertyType}
              onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kasturi-gold focus:border-transparent transition-all duration-300"
            >
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kasturi-gold focus:border-transparent transition-all duration-300"
            >
              {priceRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kasturi-gold focus:border-transparent transition-all duration-300"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
            <select
              value={filters.bedrooms}
              onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kasturi-gold focus:border-transparent transition-all duration-300"
            >
              {bedroomOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
          <button className="text-gray-600 hover:text-gray-800 transition-colors">
            Clear All Filters
          </button>
          <button className="bg-kasturi-gold text-white px-6 py-2 rounded-lg hover:bg-kasturi-gold-dark transition-all duration-300 transform hover:scale-105">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};