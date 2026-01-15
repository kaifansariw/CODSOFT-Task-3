import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2 } from 'lucide-react';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="bg-blue-100 p-4 rounded">
                    Your cart is empty <Link to="/" className="underline ml-2">Go Back</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex items-center justify-between border-b pb-4 mb-4 gap-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                <div className="flex-1 min-w-0">
                                    <Link to={`/product/${item._id}`} className="font-bold hover:underline block truncate">{item.name}</Link>
                                    <span className="text-gray-600 block">${item.price}</span>
                                </div>
                                <div className="w-24">
                                    <select 
                                        className="w-full border p-1 rounded" 
                                        value={item.qty} 
                                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                    >
                                        {[...Array(item.countInStock).keys()].map(x => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <button onClick={() => removeFromCartHandler(item._id)} className="text-red-500 hover:text-red-700">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg h-fit border">
                        <h2 className="text-xl font-bold mb-4 border-b pb-4">
                            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                        </h2>
                        <div className="text-2xl font-bold mb-6">
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </div>
                        <button 
                            className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 disabled:opacity-50"
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Proceed To Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartScreen;
