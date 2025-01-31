import React from 'react';
import { Star, PieChart as ChartPie } from 'lucide-react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

interface ThankYouProps {
  rating: number;
}

const ThankYou: React.FC<ThankYouProps> = ({ rating }) => {
  // Simulated data for the pie chart
  const data = {
    labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
    datasets: [
      {
        data: [40, 30, 15, 10, 5],
        backgroundColor: [
          'rgba(147, 51, 234, 0.8)',  // Purple
          'rgba(168, 85, 247, 0.8)',  // Light Purple
          'rgba(192, 132, 252, 0.8)', // Lighter Purple
          'rgba(216, 180, 254, 0.8)', // Very Light Purple
          'rgba(233, 213, 255, 0.8)'  // Lightest Purple
        ],
        borderColor: [
          'rgba(147, 51, 234, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(192, 132, 252, 1)',
          'rgba(216, 180, 254, 1)',
          'rgba(233, 213, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-purple-600">Thank You!</h2>
        <p className="text-xl mb-6">We appreciate your feedback</p>
        <div className="flex justify-center space-x-2 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-8 h-8 transition-all duration-300 ${
                star <= rating 
                  ? 'fill-yellow-400 text-yellow-400 animate-pulse'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-gray-600">Your feedback helps us improve our services!</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Customer Satisfaction Overview</h3>
          <ChartPie className="text-purple-600 w-6 h-6" />
        </div>
        <div className="h-80">
          <Pie data={data} options={options} />
        </div>
        <div className="mt-6 text-center text-gray-600">
          Based on recent customer feedback
        </div>
      </div>
    </div>
  );
}

export default ThankYou;