import React from "react";
import { useState } from "react";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import avatar from "../assets/avatar.png";
import { useSelector } from "react-redux";

const navigation = [
  { name: "Dashboard", href: "/user-dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];
const Navbar = () => {
  const [isdropdown, setIsdropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const cartItems = useSelector(state =>state.cart.cartItems)
  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      {/* navbar */}
      <nav className="flex justify-between items-center">
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <HiMiniBars3CenterLeft className="size-6" />
          </Link>
          <div className="relative sm:w-72 w-40 space-x-2">
            <input
              type="text"
              placeholder="Search here"
              className="bg-gray-200 py-1 md:px-8 px-6 focus:outline-none rounded-md w-full"
            />
            <IoSearchOutline className="absolute md:left-66 bottom-2 left-35" />
          </div>
        </div>

        <div className="relative flex items-center md:space-x-3 space-x-2">
          {currentUser ? <>
            <button
              onClick={() => setIsdropdown(!isdropdown)}
            >
              <img src={avatar} alt="" className={`size-7 rounded-full ${currentUser?'ring-2 ring-blue-500':''}` } />
            </button>
            {/* show drop */}
            {
              isdropdown && (
                <div className="absolute right-0 top-8 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                  <ul className="py-2">
                    {
                      navigation.map((item)=>(
                        <li key={item.name} >
                          <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                            {item.name}
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              )
            }
          </> : 
            <Link to="/login">
              <FiUser className="size-6" />
            </Link>
          }
          <button className="hidden sm:block sm:ml-2">
            <FiHeart className="size-6" />
          </button>
          <Link
            to="/cart"
            className="bg-amber-300 p-1 sm:px-6 px-2 flex items-center rounded-sm"
          >
            <FiShoppingCart />
            {
              cartItems.length > 0 ? <span className="text-sm font-semibold sm:ml-1">{cartItems.length}</span>:<span className="text-sm font-semibold sm:ml-1">0</span>
            }
            
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
