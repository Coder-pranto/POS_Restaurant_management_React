import { useState } from 'react';
import { FaHome, FaClipboardList, FaCreditCard, FaShoppingCart } from 'react-icons/fa';

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState('home');

  const menuItems = [
    { name: 'home', icon: <FaHome />, title: 'Home' },
    { name: 'menu', icon: <FaClipboardList />, title: 'Menu' },
    { name: 'payment', icon: <FaCreditCard />, title: 'Payment' },
    { name: 'orders', icon: <FaShoppingCart />, title: 'Orders' },
  ];

  const handleItemClick = (name) => {
    setSelectedItem(name);
  };

  return (
    <div className="h-screen w-20 bg-gray-200  text-slate-500  border-slate-700 flex flex-col">
      {menuItems.map((item) => (
        <div
          key={item.name}
          onClick={() => handleItemClick(item.name)}
          className={`flex items-center p-4 cursor-pointer hover:bg-gray-400 ${
            selectedItem === item.name ? 'text-[#376a74]' : ''
          }`}
        >
         <div className="flex flex-col justify-center items-center text-sm">
         <div>{item.icon}</div>
         <div>{item.title}</div>
         </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
