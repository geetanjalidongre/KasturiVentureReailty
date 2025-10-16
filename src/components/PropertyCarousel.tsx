import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Property } from '../lib/supabase';

interface PropertyCarouselProps {
  properties: Property[];
  autoPlay?: boolean;
  interval?: number;
}

export const PropertyCarousel: React.FC<PropertyCarouselProps> = ({
  properties,
  autoPlay = true,
  interval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isPlaying || !properties || properties.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % properties.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, properties, interval]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + properties.length) % properties.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % properties.length);
  };

  if (!properties || properties.length === 0) {
    return (
      <div className="relative w-full h-96 bg-gray-200 rounded-2xl flex items-center justify-center">
        <p className="text-gray-500">No featured properties available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 group">
      <div className="overflow-hidden rounded-2xl h-full relative">
        {properties.map((property, index) => (
          <div
            key={property.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={property.image_url || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{property.title}</h3>
              <p className="text-white/90">{property.location}</p>
              {property.price && (
                <p className="text-amber-400 text-xl font-bold mt-2">₹{property.price.toLocaleString()}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-amber-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-amber-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-amber-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-amber-500 w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
