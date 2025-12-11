import React, { useState } from 'react';
import { X, Star, Send, MessageCircle, Mail } from 'lucide-react';
import { FloatingLabelInput, FloatingLabelTextarea } from './FloatingLabels';

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackForm({ isOpen, onClose }: FeedbackFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    rating: 0,
    experience: '',
    suggestions: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent, method: 'email' | 'whatsapp') => {
    e.preventDefault();

    const ratingStars = '⭐'.repeat(formData.rating);

    if (method === 'email') {
      const subject = encodeURIComponent('Customer Feedback - KASTURI REALITY VENTURE');
      const body = encodeURIComponent(`Feedback from Customer

Name: ${formData.name}
Mobile / Email: ${formData.contact}
Rating: ${ratingStars} (${formData.rating}/5)

Experience:
${formData.experience}

Suggestions / Feedback:
${formData.suggestions}

---
Sent from KASTURI REALITY VENTURE Website`);

      window.open(`mailto:Kasturiventures99@gmail.com?subject=${subject}&body=${body}`, '_blank');
    } else {
      const message = encodeURIComponent(`*Feedback from Customer*

*Name:* ${formData.name}
*Mobile / Email:* ${formData.contact}
*Rating:* ${ratingStars} (${formData.rating}/5)

*Experience:*
${formData.experience}

*Suggestions / Feedback:*
${formData.suggestions}`);

      window.open(`https://wa.me/919987739999?text=${message}`, '_blank');
    }

    setFormData({
      name: '',
      contact: '',
      rating: 0,
      experience: '',
      suggestions: ''
    });
    onClose();
  };

  const isFormValid = formData.name && formData.contact && formData.rating > 0 && formData.experience;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-zoom-in">
        <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-yellow-500 text-white p-6 rounded-t-3xl flex justify-between items-center z-10">
          <div>
            <h2 className="text-3xl font-bold">Share Your Feedback</h2>
            <p className="text-amber-100 mt-1">We value your opinion and suggestions</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-all duration-300 hover:rotate-90"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form className="p-8 space-y-6">
          <div className="animate-zoom-in" style={{ animationDelay: '0.1s' }}>
            <FloatingLabelInput
              label="Name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="animate-zoom-in" style={{ animationDelay: '0.2s' }}>
            <FloatingLabelInput
              label="Mobile / Email"
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              required
            />
          </div>

          <div className="animate-zoom-in" style={{ animationDelay: '0.3s' }}>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Rating (⭐ 1 to ⭐ 5)
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transform transition-all duration-200 hover:scale-125"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= (hoveredRating || formData.rating)
                        ? 'fill-amber-500 text-amber-500'
                        : 'text-gray-300'
                    } transition-colors duration-200`}
                  />
                </button>
              ))}
              {formData.rating > 0 && (
                <span className="ml-4 text-2xl font-bold text-amber-600 animate-fade-in">
                  {formData.rating}/5
                </span>
              )}
            </div>
          </div>

          <div className="animate-zoom-in" style={{ animationDelay: '0.4s' }}>
            <FloatingLabelTextarea
              label="Your Experience"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="animate-zoom-in" style={{ animationDelay: '0.5s' }}>
            <FloatingLabelTextarea
              label="Suggestions / Feedback"
              value={formData.suggestions}
              onChange={(e) => setFormData({ ...formData, suggestions: e.target.value })}
              rows={4}
            />
          </div>

          <div className="flex space-x-4 pt-4 animate-zoom-in" style={{ animationDelay: '0.6s' }}>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'email')}
              disabled={!isFormValid}
              className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Mail className="w-5 h-5" />
              <span>Send via Email</span>
            </button>

            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'whatsapp')}
              disabled={!isFormValid}
              className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Send via WhatsApp</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            Your feedback will be sent directly to us via your chosen method
          </p>
        </form>
      </div>
    </div>
  );
}
