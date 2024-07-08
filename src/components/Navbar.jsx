import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FaRegCalendarTimes } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    return format(date, "MMMM do yyyy, HH:mm");
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-200 text-white">
      <div className="text-xl font-bold">
        <span className='text-blue-500'>P </span ><span className="text-orange-300">O</span><span className='text-slate-700'> S</span>
      </div>
      <div className="flex-1 mx-44">
        <input
          type="text"
          placeholder="Search..."
          className="w-[50%] p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div className="flex items-center space-x-4 text-black">
        <div>
          <FaRegCalendarTimes />
        </div>
        <div>
          {formatDateTime(currentTime)}
        </div>
        <button className="bg-[#b1ced4] text-blue-500 px-5 py-2 rounded hover:bg-blue-600 hover:text-white transition">
          <p className='flex items-center justify-center text-slate-800 gap-x-1'>
            <IoMdAddCircleOutline />Add Table
          </p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
