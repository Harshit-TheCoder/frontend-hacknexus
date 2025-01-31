import React, { useState, useEffect } from 'react';
import { AlertTriangle, Send, Shield } from 'lucide-react';

interface ReviewFormProps {
  selectedEmotion: string;
  onSubmit: (text: string) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ selectedEmotion, onSubmit }) => {
  const [text, setText] = useState('');
  const [warning, setWarning] = useState('');
  const [spamScore, setSpamScore] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const checkForSpam = (input: string) => {
    let score = 0;
    
    // Check for repeated patterns
    const words = input.toLowerCase().split(' ');
    const uniqueWords = new Set(words);
    if (uniqueWords.size < words.length * 0.5) {
      score += 30;
    }

    // Check for excessive punctuation
    const punctuationCount = (input.match(/[!?.]/g) || []).length;
    if (punctuationCount > input.length * 0.15) {
      score += 20;
    }

    // Check for all caps words
    const capsWords = input.split(' ').filter(word => word.length > 3 && word === word.toUpperCase());
    if (capsWords.length > words.length * 0.3) {
      score += 20;
    }

    // Check for common spam phrases
    const spamPhrases = ['click here', 'buy now', 'free offer', 'act now', 'limited time'];
    spamPhrases.forEach(phrase => {
      if (input.toLowerCase().includes(phrase)) {
        score += 15;
      }
    });

    return score;
  };

  const detectEmotion = (input: string) => {
    const happyWords = ['happy', 'great', 'excellent', 'amazing', 'good', 'wonderful', 'fantastic'];
    const sadWords = ['sad', 'bad', 'poor', 'terrible', 'awful', 'disappointed', 'unhappy'];
    
    const text = input.toLowerCase();
    const happyCount = happyWords.filter(word => text.includes(word)).length;
    const sadCount = sadWords.filter(word => text.includes(word)).length;
    
    if (happyCount > sadCount && selectedEmotion === 'sad') {
      return 'Your review seems more positive than your selected emotion.';
    }
    if (sadCount > happyCount && selectedEmotion === 'happy') {
      return 'Your review seems more negative than your selected emotion.';
    }
    return '';
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (text.length > 10) {
        const spamScore = checkForSpam(text);
        setSpamScore(spamScore);
        
        if (spamScore > 50) {
          setWarning('This review appears to be spam or fake.');
        } else {
          const emotionWarning = detectEmotion(text);
          setWarning(emotionWarning);
        }
      } else {
        setWarning('');
        setSpamScore(0);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [text, selectedEmotion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.length >= 10 && spamScore < 50) {
      onSubmit(text);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Share your thoughts</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setIsTyping(true);
              setTimeout(() => setIsTyping(false), 1000);
            }}
            className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
              isTyping ? 'bg-purple-50' : 'bg-white'
            }`}
            placeholder="Tell us about your experience..."
            rows={6}
            minLength={10}
            required
          />
          {text.length > 0 && (
            <div className="absolute bottom-4 right-4 text-sm text-gray-500">
              {text.length} characters
            </div>
          )}
        </div>

        {warning && (
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg flex items-center space-x-2 animate-fade-in">
            <AlertTriangle className="text-yellow-500" />
            <span className="text-yellow-700">{warning}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className={`w-5 h-5 ${spamScore > 50 ? 'text-red-500' : 'text-green-500'}`} />
            <div className="text-sm">
              <div className="font-medium">Authenticity Score</div>
              <div className="h-2 w-32 bg-gray-200 rounded-full mt-1">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    spamScore > 50 ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${100 - spamScore}%` }}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
              spamScore > 50 || text.length < 10
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-lg transform hover:-translate-y-1'
            }`}
            disabled={spamScore > 50 || text.length < 10}
          >
            <Send className="w-5 h-5" />
            <span>Submit Review</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;