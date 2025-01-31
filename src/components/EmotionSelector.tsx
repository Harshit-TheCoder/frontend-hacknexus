import React from 'react';
import { Smile, Frown, Meh } from 'lucide-react';

interface EmotionSelectorProps {
  onSelect: (emotion: string) => void;
}

const EmotionSelector: React.FC<EmotionSelectorProps> = ({ onSelect }) => {
  const emotions = [
    { icon: Smile, label: 'Happy', value: 'happy' },
    { icon: Meh, label: 'Neutral', value: 'neutral' },
    { icon: Frown, label: 'Sad', value: 'sad' },
  ];

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">How was your experience?</h1>
      <div className="grid grid-cols-3 gap-6">
        {emotions.map(({ icon: Icon, label, value }) => (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center space-y-4">
              <Icon className={`w-16 h-16 transition-colors duration-300
                ${value === 'happy' ? 'group-hover:text-green-500' : ''}
                ${value === 'neutral' ? 'group-hover:text-yellow-500' : ''}
                ${value === 'sad' ? 'group-hover:text-red-500' : ''}
              `} />
              <span className="text-xl font-medium text-gray-700">{label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default EmotionSelector