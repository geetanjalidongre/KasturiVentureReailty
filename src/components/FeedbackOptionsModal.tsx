import React, { useState } from 'react';
import { X, Star, MessageSquare, MessageCircle, Send } from 'lucide-react';
import { feedbackService } from '../lib/supabase';

interface FeedbackOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackOptionsModal({ isOpen, onClose }: FeedbackOptionsModalProps) {
  const [selectedOption, setSelectedOption] = useState<'rating' | 'form' | 'whatsapp' | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!isOpen) return null;

  const handleRatingSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    try {
      await feedbackService.submitFeedback({
        name: 'Anonymous',
        rating,
        message: `User rated ${rating} stars`
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
        resetForm();
      }, 2000);
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await feedbackService.submitFeedback({
        name: formData.name,
        email: formData.email || undefined,
        rating: formData.rating || 5,
        message: formData.message
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
        resetForm();
      }, 2000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppFeedback = () => {
    const message = encodeURIComponent('Hi, I would like to share my feedback about your services.');
    window.open(`https://wa.me/919987739999?text=${message}`, '_blank');
    onClose();
  };

  const resetForm = () => {
    setSelectedOption(null);
    setRating(0);
    setHoverRating(0);
    setFormData({ name: '', email: '', message: '', rating: 0 });
    setSubmitSuccess(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetForm, 300);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-zoom-in">
        <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-yellow-500 p-6 rounded-t-3xl flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white">Share Your Feedback</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/20 rounded-full transition-all duration-300 transform hover:rotate-90"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-8">
          {submitSuccess ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-zoom-in">
                <Send className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600">Your feedback has been submitted successfully.</p>
            </div>
          ) : !selectedOption ? (
            <div className="space-y-4">
              <p className="text-center text-gray-600 mb-8">Choose how you'd like to share your feedback:</p>

              <button
                onClick={() => setSelectedOption('rating')}
                className="w-full p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-amber-200 hover:border-amber-400 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Quick Rating</h3>
                    <p className="text-gray-600">Rate your experience with stars</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedOption('form')}
                className="w-full p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-blue-200 hover:border-blue-400 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Detailed Feedback</h3>
                    <p className="text-gray-600">Share your thoughts in detail</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedOption('whatsapp')}
                className="w-full p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-green-200 hover:border-green-400 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">WhatsApp Feedback</h3>
                    <p className="text-gray-600">Chat with us directly on WhatsApp</p>
                  </div>
                </div>
              </button>
            </div>
          ) : selectedOption === 'rating' ? (
            <div className="text-center py-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Rate Your Experience</h3>
              <p className="text-gray-600 mb-8">How would you rate our service?</p>

              <div className="flex justify-center space-x-2 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transform transition-all duration-300 hover:scale-125"
                  >
                    <Star
                      className={`w-12 h-12 transition-colors ${
                        star <= (hoverRating || rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {rating > 0 && (
                <div className="mb-6 animate-fade-in">
                  <p className="text-xl font-semibold text-amber-600">
                    {rating === 5 && "Excellent! Thank you!"}
                    {rating === 4 && "Great! We appreciate it!"}
                    {rating === 3 && "Good! Thanks for your feedback!"}
                    {rating === 2 && "We'll do better!"}
                    {rating === 1 && "Sorry to hear that!"}
                  </p>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedOption(null)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-full hover:bg-gray-50 transition-all duration-300 font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={handleRatingSubmit}
                  disabled={isSubmitting || rating === 0}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-full hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Rating'}
                </button>
              </div>
            </div>
          ) : selectedOption === 'form' ? (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Your Thoughts</h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all resize-none"
                  rows={4}
                  placeholder="Tell us about your experience..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rate Your Experience
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="transform transition-all duration-300 hover:scale-125"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= formData.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedOption(null)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-full hover:bg-gray-50 transition-all duration-300 font-semibold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-full hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </form>
          ) : selectedOption === 'whatsapp' ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">WhatsApp Feedback</h3>
              <p className="text-gray-600 mb-8">We'll redirect you to WhatsApp where you can chat with us directly.</p>

              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedOption(null)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-full hover:bg-gray-50 transition-all duration-300 font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={handleWhatsAppFeedback}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-semibold"
                >
                  Open WhatsApp
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
