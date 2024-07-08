// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [tables] = useState(()=>{
//     const tabelIds = Array.from({length:21},(_,i)=>i+1);
//     return tabelIds.map((id)=>({id}));
//   });
//   const [selectedTable, setSelectedTable] = useState(null);

//   const navigate = useNavigate();

//   const handleSelectTable = (id) => {
//     setSelectedTable(id);
//   };

//   const handleContinue = () => {
//     if (selectedTable !== null) {
//       const orderNumber = `ORD-${new Date().toISOString()}-Table${selectedTable}`;
//       navigate('/menu', { state: { selectedTable, orderNumber } });
//     }
//   };

//   const selectedTableData = selectedTable ? tables.find(table => table.id === selectedTable) : null;

//   return (
//     <div className="flex h-full">
//       <div className="flex-1 p-4">
//         <h1 className="text-2xl font-bold mb-4">TABLE LIST</h1>
//         <div className="grid grid-cols-3 gap-4">
//           {tables.map((table) => (
//             <div
//               key={table.id}
//               className={`border p-4 ${selectedTable === table.id ? 'border-blue-500' : 'border-gray-300'}`}
//               onClick={() => handleSelectTable(table.id)}
//             >
//               <h2 className="text-lg font-bold mb-2">T{table.id}</h2>
//             </div>
//           ))}
//         </div>
//         <button
//           className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
//           onClick={handleContinue}
//         >
//           SELECT AND CONTINUE
//         </button>
//       </div>
//       <div className="w-1/3 p-4 border-l border-gray-300">
//         <h2 className="text-lg font-bold mb-4">ORDER #</h2>
//         <p>Table: {selectedTableData ? `T${selectedTableData.id}` : '-'}</p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tables, setTables] = useState(() => {
    const tableIds = Array.from({ length: 21 }, (_, i) => i + 1);
    return tableIds.map((id) => ({
      id,
      occupied: localStorage.getItem(`table-${id}`) === 'occupied',
    }));
  });
  const [selectedTable, setSelectedTable] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setTables((prevTables) =>
        prevTables.map((table) => ({
          ...table,
          occupied: localStorage.getItem(`table-${table.id}`) === 'occupied',
        }))
      );
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleSelectTable = (id) => {
    setSelectedTable(id);
  };

  const handleContinue = () => {
    if (selectedTable !== null) {
      const orderNumber = `ORD-${new Date().toISOString()}-Table${selectedTable}`;
      localStorage.setItem(`table-${selectedTable}`, 'occupied');
      navigate('/menu', { state: { selectedTable, orderNumber } });
    }
  };

  const selectedTableData = selectedTable ? tables.find((table) => table.id === selectedTable) : null;

  return (
    <div className="flex h-full bg-gray-100">
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">TABLE LIST</h1>
        <div className="grid grid-cols-3 gap-4">
          {tables.map((table) => (
            <div
              key={table.id}
              className={`p-4 rounded-lg cursor-pointer transform transition duration-300 ${
                selectedTable === table.id
                  ? 'border-2 border-blue-500 bg-blue-100'
                  : table.occupied
                  ? 'bg-green-200 text-gray-700'
                  : 'bg-white border border-gray-300'
              }`}
              onClick={() => !table.occupied && handleSelectTable(table.id)}
            >
              <h2 className="text-lg font-bold mb-2 text-center">T{table.id}</h2>
              {table.occupied && (
                <p className="text-center text-sm text-red-600">Occupied</p>
              )}
            </div>
          ))}
        </div>
        <button
          className={`mt-4 px-4 py-2 rounded-lg transition duration-300 ${
            selectedTable !== null
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={handleContinue}
          disabled={selectedTable === null}
        >
          SELECT AND CONTINUE
        </button>
      </div>
      <div className="w-1/3 p-4 border-l border-gray-300">
        <h2 className="text-lg font-bold mb-4">ORDER #</h2>
        <p className="text-gray-700">Table: {selectedTableData ? `T${selectedTableData.id}` : '-'}</p>
      </div>
    </div>
  );
};

export default Dashboard;