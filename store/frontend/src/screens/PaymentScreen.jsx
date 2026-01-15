import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState('Stripe');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-8">Payment Method</h1>
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="block mb-4 font-semibold">Select Method</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="Stripe"
                checked={paymentMethod === 'Stripe'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              Stripe or Credit Card
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="PayPal"
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              PayPal
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded font-bold hover:bg-gray-800"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen;
