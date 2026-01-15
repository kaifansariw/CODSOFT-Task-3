import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      alert('Order placed successfully!');
      navigate(`/order/${res._id}`);
    } catch (err) {
      alert(err?.data?.message || err.error || 'Failed to place order');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Place Order</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="border p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Shipping</h2>
            <p>
              <strong>Address: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>

          <div className="border p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </p>
          </div>

          <div className="border p-4 rounded">
            <h2 className="text-xl font-bold mb-4">Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 border-b pb-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <Link to={`/product/${item._id}`} className="hover:underline">
                        {item.name}
                      </Link>
                    </div>
                    <div>
                      {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg h-fit border">
          <h2 className="text-xl font-bold mb-4 border-b pb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Items:</span>
              <span>${cart.itemsPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>${cart.shippingPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${cart.taxPrice}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>${cart.totalPrice}</span>
            </div>
          </div>
          <button
            onClick={placeOrderHandler}
            disabled={cart.cartItems.length === 0 || isLoading}
            className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 disabled:opacity-50"
          >
            {isLoading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
