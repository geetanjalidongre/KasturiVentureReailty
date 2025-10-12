import React, { useState, useEffect } from 'react';
import { X, Star, Trash2, RefreshCw, Mail, User, Calendar } from 'lucide-react';
import { feedbackService, Feedback } from '../lib/supabase';

interface FeedbackViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackViewer({ isOpen, onClose }: FeedbackViewerProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadFeedbacks();
    }
  }, [isOpen]);

  const loadFeedbacks = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await feedbackService.getFeedback();
      setFeedbacks(data);
    } catch (err) {
      setError('Failed to load feedback');
      console.error('Error loading feedback:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this feedback?')) {
      return;
    }

    setDeletingId(id);
    try {
      await feedbackService.deleteFeedback(id);
      setFeedbacks(feedbacks.filter(f => f.id !== id));
    } catch (err) {
      setError('Failed to delete feedback');
      console.error('Error deleting feedback:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Feedback Management</h2>
            <p className="text-gray-600 mt-1">View and manage customer feedback</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={loadFeedbacks}
              disabled={isLoading}
              className="p-2 text-gray-600 hover:text-amber-600 transition-colors disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600">No feedback yet</p>
              <p className="text-gray-500 mt-2">Customer feedback will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className="bg-gradient-to-br from-gray-50 to-amber-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-600" />
                          <span className="font-semibold text-gray-900">{feedback.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-600 text-sm">{feedback.email}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= feedback.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex items-center space-x-1 text-gray-500 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(feedback.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(feedback.id)}
                      disabled={deletingId === feedback.id}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete feedback"
                    >
                      {deletingId === feedback.id ? (
                        <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-700 whitespace-pre-wrap">{feedback.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-3xl">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Total Feedback: {feedbacks.length}</span>
            <span>Average Rating: {feedbacks.length > 0 ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1) : '0.0'} ⭐</span>
          </div>
        </div>
      </div>
    </div>
  );
}
