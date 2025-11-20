import React, { useState } from 'react';
import { X, MapPin, Bed, Bath, Maximize, Building2, Phone, Mail, MessageCircle, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Property } from '../lib/supabase';

interface PropertyDetailModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({ property, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  if (!isOpen || !property) return null;

  const propertyImages = property.images && Array.isArray(property.images) && property.images.length > 0
    ? property.images.map(img => img.startsWith('http') ? img : `${import.meta.env.BASE_URL}${img.replace(/^\//, '')}`)
    : [];

  const images = propertyImages.length > 0
    ? propertyImages.map((img, idx) =>
        imageErrors[idx] ? 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg' : img
      )
    : ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleContact = (method: 'email' | 'whatsapp' | 'phone') => {
    if (method === 'email') {
      const subject = encodeURIComponent(`Inquiry about ${property.title}`);
      const body = encodeURIComponent(`Hi Manoj,\n\nI am interested in the property: ${property.title}\nLocation: ${property.location}\n\nPlease provide more details.\n\nThank you!`);
      window.open(`mailto:Kasturiventures99@gmail.com?subject=${subject}&body=${body}`, '_blank');
    } else if (method === 'whatsapp') {
      const message = encodeURIComponent(`Hi, I am interested in ${property.title} located at ${property.location}. Please share more details.`);
      window.open(`https://wa.me/919987739999?text=${message}`, '_blank');
    } else if (method === 'phone') {
      window.open('tel:+919987739999', '_blank');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-all shadow-lg z-50 m-4"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="clear-both"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[400px] bg-gray-200">
            <img
              src={images[currentImageIndex]}
              alt={property.title}
              onError={() => setImageErrors(prev => ({ ...prev, [currentImageIndex]: true }))}
              className="w-full h-full object-cover lg:rounded-l-2xl"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full hover:bg-amber-500 hover:text-white transition-all shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full hover:bg-amber-500 hover:text-white transition-all shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentImageIndex ? 'bg-amber-500 w-8' : 'bg-white/60 w-2'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            <div className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              {property.property_type}
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {property.title}
            </h2>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="w-5 h-5 mr-2 text-amber-500" />
              <span className="text-lg">{property.location}</span>
            </div>
            <div className="text-3xl font-bold text-amber-600 mb-6">
              {property.price_display || (property.price ? `₹${property.price.toLocaleString()}` : 'Contact for Price')}
            </div>

            {property.description && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6">
              {property.bedrooms && (
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-xl text-center">
                  <Bed className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
              )}
              {property.bathrooms && (
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-xl text-center">
                  <Bath className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
              )}
              {(property.sqft || property.area) && (
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-xl text-center">
                  <Maximize className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.sqft || property.area}</div>
                  <div className="text-sm text-gray-600">Sq. Ft.</div>
                </div>
              )}
              {property.property_type && (
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-xl text-center">
                  <Building2 className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <div className="text-sm font-bold text-gray-900">{property.property_type}</div>
                  <div className="text-sm text-gray-600">Type</div>
                </div>
              )}
            </div>

            {property.amenities && Array.isArray(property.amenities) && property.amenities.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Agent</h3>
              <div className="bg-gradient-to-br from-gray-50 to-amber-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mr-4">
                    MS
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">Manoj Shrivastav</div>
                    <div className="text-sm text-gray-600">Property Consultant</div>
                    <div className="text-sm text-amber-600 font-medium">+91 99877 39999</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleContact('phone')}
                    className="flex flex-col items-center justify-center bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition-all hover:scale-105 shadow-lg"
                  >
                    <Phone className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">Call</span>
                  </button>
                  <button
                    onClick={() => handleContact('email')}
                    className="flex flex-col items-center justify-center bg-red-600 text-white p-4 rounded-xl hover:bg-red-700 transition-all hover:scale-105 shadow-lg"
                  >
                    <Mail className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">Email</span>
                  </button>
                  <button
                    onClick={() => handleContact('whatsapp')}
                    className="flex flex-col items-center justify-center bg-green-600 text-white p-4 rounded-xl hover:bg-green-700 transition-all hover:scale-105 shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-4 rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
