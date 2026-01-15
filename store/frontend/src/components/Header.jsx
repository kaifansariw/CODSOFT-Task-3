import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">TECHSHOP</Link>
        <nav className="flex items-center space-x-6">
          <Link to="/cart" className="flex items-center hover:text-gray-300 relative">
            <ShoppingCart className="w-6 h-6 mr-1" />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 py-0.5 text-xs">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>
          {userInfo ? (
            <div className="flex items-center space-x-4">
              <span className="flex items-center"><User className="w-5 h-5 mr-1" /> {userInfo.name}</span>
              <button onClick={logoutHandler} className="hover:text-red-400"><LogOut className="w-5 h-5" /></button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center hover:text-gray-300">
              <User className="w-6 h-6 mr-1" />
              <span>Sign In</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
