import React from 'react';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <div className="p-8 text-center">Loading products...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error?.data?.message || error.error}</div>;

  return (
    <div className="container mx-auto p-4 lg:py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
            <Link to={`/product/${product._id}`}>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            </Link>
            <div className="p-4">
              <Link to={`/product/${product._id}`}>
                <h2 className="font-semibold text-lg truncate mb-2">{product.name}</h2>
              </Link>
              <div className="flex items-center mb-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-600">{product.rating} ({product.numReviews} reviews)</span>
              </div>
              <div className="text-xl font-bold text-gray-900">${product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
