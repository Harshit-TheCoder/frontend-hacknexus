import React, { useState } from 'react';
import { Smile, Frown, Meh, AlertTriangle, Star, Copy, Send } from 'lucide-react';
import ReviewForm from './components/ReviewForm';
import EmotionSelector from './components/EmotionSelector';
import ThankYou from './components/ThankYou';

function App() {
  const [step, setStep] = useState(1);
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion);
    setStep(2);
  };

  const handleReviewSubmit = (text: string) => {
    setReview(text);
    setStep(3);
  };

  const handleRatingSubmit = (value: number) => {
    setRating(value);
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100">
      <div className="container mx-auto px-4 py-8">
        {step === 1 && <EmotionSelector onSelect={handleEmotionSelect} />}
        {step === 2 && (
          <ReviewForm 
            selectedEmotion={selectedEmotion} 
            onSubmit={handleReviewSubmit}
          />
        )}
        {step === 3 && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Rate Your Experience</h2>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-10 h-10 cursor-pointer transition-colors ${
                    star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                  onClick={() => handleRatingSubmit(star)}
                />
              ))}
            </div>
          </div>
        )}
        {step === 4 && <ThankYou rating={rating} />}
      </div>
    </div>
  );
}

export default App;