import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);

  return isLoading ? (
    <div className="container mx-auto p-4">Loading...</div>
  ) : error ? (
    <div className="container mx-auto p-4 text-red-600">{error?.data?.message || error.error}</div>
  ) : (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Order {order._id}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="border p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Shipping</h2>
            <p><strong>Name:</strong> {order.user.name}</p>
            <p><strong>Email:</strong> {order.user.email}</p>
            <p>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <div className="bg-green-100 text-green-800 p-2 rounded mt-2">
                Delivered on {order.deliveredAt}
              </div>
            ) : (
              <div className="bg-yellow-100 text-yellow-800 p-2 rounded mt-2">
                Not Delivered
              </div>
            )}
          </div>

          <div className="border p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Payment Method</h2>
            <p><strong>Method:</strong> {order.paymentMethod}</p>
            {order.isPaid ? (
              <div className="bg-green-100 text-green-800 p-2 rounded mt-2">
                Paid on {order.paidAt}
              </div>
            ) : (
              <div className="bg-yellow-100 text-yellow-800 p-2 rounded mt-2">
                Not Paid
              </div>
            )}
          </div>

          <div className="border p-4 rounded">
            <h2 className="text-xl font-bold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 border-b pb-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <Link to={`/product/${item.product}`} className="hover:underline">
                      {item.name}
                    </Link>
                  </div>
                  <div>
                    {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg h-fit border">
          <h2 className="text-xl font-bold mb-4 border-b pb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Items:</span>
              <span>${order.itemsPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>${order.shippingPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${order.taxPrice}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>${order.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
