import React, { useState, useEffect } from 'react';
import Foodcard from '../components/Foodcard';
import API from '../../services/api';

const RestaurantDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    foodName: '',
    quantity: '',
    location: '',
    expiryDate: ''
  });

  // Fetch own donations
  const fetchDonations = async () => {
    try {
      setLoading(true);
      const res = await API.get('/food/my-donations'); // Assume endpoint for own donations
      setDonations(res.data || []);
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // Handle form input
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Add new donation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/food', formData);
      setFormData({ foodName: '', quantity: '', location: '', expiryDate: '' });
      fetchDonations(); // Refresh list
    } catch (error) {
      console.error('Error adding donation:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Restaurant Dashboard
          </h1>
          <p className="text-xl text-gray-600">Manage your food donations</p>
        </div>

        {/* Add Donation Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Donation</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="foodName"
              placeholder="Food Name (e.g., Rice, Bread)"
              value={formData.foodName}
              onChange={handleInputChange}
              className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity (e.g., 10 kg)"
              value={formData.quantity}
              onChange={handleInputChange}
              className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location/Pickup Point"
              value={formData.location}
              onChange={handleInputChange}
              className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent md:col-span-2"
              required
            />
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent md:col-span-2"
              required
            />
            <button
              type="submit"
              className="md:col-span-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-4 px-8 rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-lg"
            >
              Donate Food
            </button>
          </form>
        </div>

        {/* Donations List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Your Donations ({donations.length})</h2>
          {donations.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No donations yet</h3>
              <p className="text-gray-500">Add your first food donation above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donations.map((donation) => (
                <Foodcard
                  key={donation._id}
                  food={donation}
                  onAccept={() => console.log('View donation', donation._id)} // Placeholder
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
