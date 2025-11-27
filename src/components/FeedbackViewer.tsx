import React, { useState, useEffect } from 'react';
import { X, Star, Trash2 } from 'lucide-react';
import { feedbackService, Feedback } from '../lib/supabase';

interface FeedbackViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackViewer: React.FC<FeedbackViewerProps> = ({ isOpen, onClose }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadFeedbacks();
    }
  }, [isOpen]);

  const loadFeedbacks = async () => {
    setIsLoading(true);
    try {
      const data = await feedbackService.getAllFeedback();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error loading feedbacks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;

    try {
      await feedbackService.deleteFeedback(id);
      setFeedbacks(feedbacks.filter((f) => f.id !== id));
    } catch (error) {
      console.error('Error deleting feedback:', error);
      alert('Failed to delete feedback');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-8 relative animate-zoom-in my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-6">Customer Feedback</h2>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading feedback...</p>
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No feedback yet</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{feedback.name}</h3>
                    {feedback.email && (
                      <p className="text-sm text-gray-600">{feedback.email}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < feedback.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => handleDelete(feedback.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete feedback"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{feedback.message}</p>
                <p className="text-xs text-gray-500 mt-3">
                  {new Date(feedback.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
