import React from 'react';
import { GiMoneyStack } from 'react-icons/gi';

const Promotions = () => {
    return (
        <section className="bg-white py-16 px-4 rounded-2xl">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-2xl font-bold text-gray-800 mb-2 flex"><GiMoneyStack /> Exclusive Discounts</h2>
    <p className="text-lg text-gray-600 mb-8">Use these coupon codes during checkout to get instant discounts on your booking!</p>

    <div className="grid grid-cols-1 gap-6">
      <div className="bg-gradient-to-r from-blue-400 to-blue-200 bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 duration-200">
        <h3 className="text-2xl font-bold mb-2">ABC123</h3>
        <p className="text-gray-600">Get <span className="font-bold text-blue-600">5% off</span> your first session!</p>
      </div>

      <div className="bg-gradient-to-r from-blue-400 to-blue-200 bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 duration-200">
        <h3 className="text-2xl font-bold mb-2">SUMMER50</h3>
        <p className="text-gray-600">Flat <span className="font-bold text-green-600">50% off</span> on all squash bookings in July!</p>
      </div>

      <div className="bg-gradient-to-r from-blue-400 to-blue-200 bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 duration-200">
        <h3 className="text-2xl font-bold mb-2">FAMILY10</h3>
        <p className="text-gray-600">Use this to get <span className="font-bold text-purple-600">10% off</span> for group/family bookings!</p>
      </div>
    </div>
  </div>
</section>

    );
};

export default Promotions;