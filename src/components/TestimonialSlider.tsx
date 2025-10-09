import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const goToTestimonial = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-5xl mx-auto overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-yellow-50 opacity-50"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-200/20 to-yellow-200/20 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-200/20 to-yellow-200/20 rounded-full translate-y-24 -translate-x-24"></div>
      
      <div className="relative z-10">
        {/* Quote Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
            <Quote className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Testimonials */}
        <div className="relative overflow-hidden min-h-[300px]">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial absolute inset-0 transition-all duration-800 ease-in-out ${
                index === currentIndex ? 'active opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-center">
                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-6 h-6 text-amber-400 fill-current mx-0.5 transform hover:scale-110 transition-transform" 
                    />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-xl md:text-2xl text-gray-700 italic mb-8 leading-relaxed max-w-4xl mx-auto">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center space-x-4">
                  {testimonial.image && (
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover shadow-lg ring-4 ring-amber-100"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/20 to-yellow-400/20"></div>
                    </div>
                  )}
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-xl">{testimonial.name}</div>
                    <div className="text-amber-600 font-semibold">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center space-x-4 mt-8">
          <button
            onClick={prevTestimonial}
            className="w-12 h-12 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-600 rounded-full hover:from-amber-500 hover:to-yellow-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-6 h-6 mx-auto" />
          </button>

          {/* Dots */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                  index === currentIndex
                    ? 'bg-amber-500 scale-125 shadow-lg'
                    : 'bg-gray-300 hover:bg-amber-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="w-12 h-12 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-600 rounded-full hover:from-amber-500 hover:to-yellow-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
            disabled={isAnimating}
          >
            <ChevronRight className="w-6 h-6 mx-auto" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-6">
          <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-yellow-400 transition-all duration-300 rounded-full"
              style={{ 
                width: `${((currentIndex + 1) / testimonials.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};