import React, { useState } from 'react';
import { Filter, ChevronDown, Search, X, MapPin, Home, DollarSign, Bed } from 'lucide-react';

export const FilterPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    propertyType: '',
    priceRange: '',
    location: '',
    bedrooms: ''
  });

  const propertyTypes = ['All', 'Villa', 'Apartment', 'Commercial', 'Plot'];
  const priceRanges = ['All', '50L - 1Cr', '1Cr - 2Cr', '2Cr - 5Cr', '5Cr+'];
  const locations = ['All', 'Banjara Hills', 'Gachibowli', 'HITEC City', 'Kompally', 'Jubilee Hills'];
  const bedroomOptions = ['All', '1 BHK', '2 BHK', '3 BHK', '4+ BHK'];

  const clearFilters = () => {
    setFilters({
      search: '',
      propertyType: '',
      priceRange: '',
      location: '',
      bedrooms: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Filter Properties</h3>
              <p className="text-sm text-gray-600">Find your perfect property</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors text-sm"
              >
                <X className="w-4 h-4" />
                <span>Clear</span>
              </button>
            )}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm border border-gray-200"
            >
              <span className="text-sm font-medium">
                {isOpen ? 'Hide Filters' : 'Show Filters'}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar - Always Visible */}
      <div className="p-6 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search properties by name, location, or type..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-gray-50 hover:bg-white"
          />
          {filters.search && (
            <button
              onClick={() => setFilters({...filters, search: ''})}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Options */}
      <div className={`filter-panel transition-all duration-500 ease-in-out ${isOpen ? 'open' : ''}`}>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Property Type */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <Home className="w-4 h-4 text-amber-500" />
                <span>Property Type</span>
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white hover:border-amber-300"
              >
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <DollarSign className="w-4 h-4 text-amber-500" />
                <span>Price Range</span>
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white hover:border-amber-300"
              >
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>Location</span>
              </label>
              <select
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white hover:border-amber-300"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Bedrooms */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <Bed className="w-4 h-4 text-amber-500" />
                <span>Bedrooms</span>
              </label>
              <select
                value={filters.bedrooms}
                onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white hover:border-amber-300"
              >
                {bedroomOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-200 space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-600">
              {hasActiveFilters ? 'Filters applied' : 'No filters applied'}
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={clearFilters}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium border border-gray-300 rounded-xl hover:border-gray-400"
              >
                Clear All
              </button>
              <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};