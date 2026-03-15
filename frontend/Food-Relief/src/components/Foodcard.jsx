import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming shadcn/ui or similar, fallback to divs if not

const Foodcard = ({ food, onAccept }) => {
  if (!food) return null;

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 mx-4 my-4">
      {/* Food Image */}
      <div className="h-48 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-t-lg flex items-center justify-center">
        <span className="text-4xl text-white">🍲</span>
      </div>
      
      {/* Card Header */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
          {food.foodName}
        </h3>
        
        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
            Quantity: {food.quantity || 'N/A'}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
            Location: {food.location || 'N/A'}
          </div>
          {food.expiryDate && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
              Expires: {new Date(food.expiryDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
      
      {/* Card Footer */}
      <div className="px-6 pb-6">
        <button
          onClick={() => onAccept?.(food._id)}
          className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium py-2 px-4 rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
        >
          Accept Donation
        </button>
      </div>
    </div>
  );
};

export default Foodcard;
