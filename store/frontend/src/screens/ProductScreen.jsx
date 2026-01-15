import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { Star, ArrowLeft } from 'lucide-react';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8">Error loading product</div>;

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => navigate(-1)} className="flex items-center mb-6 text-gray-600 hover:text-black">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <img src={product.image} alt={product.name} className="w-full rounded-lg" />
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center mb-4 border-b pb-4">
            <Star className="text-yellow-400 fill-current" />
            <span className="ml-2 font-medium">{product.rating} Rating ({product.numReviews} reviews)</span>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-4">${product.price}</div>
          <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>
          
          <div className="border rounded-lg p-6 max-w-sm">
            <div className="flex justify-between mb-4">
                <span>Status:</span>
                <span className={product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
            </div>
            {product.countInStock > 0 && (
              <div className="mb-6">
                <label className="block mb-2">Quantity:</label>
                <select 
                    value={qty} 
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="w-full border p-2 rounded"
                >
                  {[...Array(product.countInStock).keys()].map(x => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </div>
            )}
            <button 
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 disabled:bg-gray-400"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
