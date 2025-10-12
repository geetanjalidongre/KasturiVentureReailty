import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Property } from '../lib/supabase';

interface PropertyCarouselProps {
  properties: Property[];
}

export const PropertyCarousel: React.FC<PropertyCarouselProps> = ({ properties }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % properties.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + properties.length) % properties.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  useEffect(() => {
    if (!isPlaying || properties.length === 0) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, properties.length]);

  if (properties.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800 h-96 md:h-[600px] flex items-center justify-center">
        <p className="text-white text-xl">No featured properties available</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Main Carousel */}
      <div className="relative h-96 md:h-[600px]">
        {properties.map((property, index) => {
          const mainImage = Array.isArray(property.images) && property.images.length > 0
            ? property.images[0]
            : 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg';

          return (
            <div
              key={property.id}
              className={`carousel-slide absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentIndex
                  ? 'active opacity-100 translate-x-0 z-10'
                  : index < currentIndex
                  ? 'prev opacity-0 -translate-x-full z-0'
                  : 'next opacity-0 translate-x-full z-0'
              }`}
            >
              <img
                src={mainImage}
                alt={property.title}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                <div className="max-w-4xl">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full text-sm font-semibold mb-6 transform hover:scale-105 transition-transform duration-300">
                    {property.property_type}
                  </div>

                  <h3 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                    {property.title}
                  </h3>

                  <p className="text-xl md:text-2xl mb-4 text-gray-200">
                    {property.location}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="text-3xl md:text-4xl font-bold text-amber-400">
                      {property.price_display}
                    </p>

                    <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-300 font-semibold transform hover:scale-105">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
        <button
          onClick={prevSlide}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110 pointer-events-auto group"
          disabled={isAnimating}
        >
          <ChevronLeft className="w-6 h-6 mx-auto group-hover:-translate-x-0.5 transition-transform" />
        </button>
        
        <button
          onClick={nextSlide}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110 pointer-events-auto group"
          disabled={isAnimating}
        >
          <ChevronRight className="w-6 h-6 mx-auto group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 mx-auto" />
        ) : (
          <Play className="w-5 h-5 mx-auto ml-0.5" />
        )}
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
              index === currentIndex
                ? 'bg-amber-400 scale-125 shadow-lg'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div 
          className="h-full bg-gradient-to-r from-amber-400 to-yellow-400 transition-all duration-300"
          style={{ 
            width: `${((currentIndex + 1) / properties.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};