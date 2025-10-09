import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

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
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      <div className="relative overflow-hidden">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`testimonial transition-all duration-500 ease-in-out ${
              index === currentIndex ? 'active opacity-100' : 'opacity-0 absolute inset-0'
            }`}
          >
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-kasturi-gold fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-gray-600 italic mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                {testimonial.image && (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                  <div className="text-kasturi-gold font-medium">{testimonial.role}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <button
        onClick={prevTestimonial}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-kasturi-gold/10 text-kasturi-gold p-2 rounded-full hover:bg-kasturi-gold hover:text-white transition-all duration-300 transform hover:scale-110"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextTestimonial}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-kasturi-gold/10 text-kasturi-gold p-2 rounded-full hover:bg-kasturi-gold hover:text-white transition-all duration-300 transform hover:scale-110"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="flex justify-center space-x-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-kasturi-gold scale-125'
                : 'bg-gray-300 hover:bg-kasturi-gold/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};