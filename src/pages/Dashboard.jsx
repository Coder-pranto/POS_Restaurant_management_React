import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tables] = useState(()=>{
    const tabelIds = Array.from({length:21},(_,i)=>i+1);
    return tabelIds.map((id)=>({id}));
  });
  const [selectedTable, setSelectedTable] = useState(null);

  const navigate = useNavigate();

  const handleSelectTable = (id) => {
    setSelectedTable(id);
  };

  const handleContinue = () => {
    if (selectedTable !== null) {
      const orderNumber = `ORD-${new Date().toISOString()}-Table${selectedTable}`;
      navigate('/menu', { state: { selectedTable, orderNumber } });
    }
  };

  const selectedTableData = selectedTable ? tables.find(table => table.id === selectedTable) : null;

  return (
    <div className="flex h-full">
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">TABLE LIST</h1>
        <div className="grid grid-cols-3 gap-4">
          {tables.map((table) => (
            <div
              key={table.id}
              className={`border p-4 ${selectedTable === table.id ? 'border-blue-500' : 'border-gray-300'}`}
              onClick={() => handleSelectTable(table.id)}
            >
              <h2 className="text-lg font-bold mb-2">T{table.id}</h2>
            </div>
          ))}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
          onClick={handleContinue}
        >
          SELECT AND CONTINUE
        </button>
      </div>
      <div className="w-1/3 p-4 border-l border-gray-300">
        <h2 className="text-lg font-bold mb-4">ORDER #</h2>
        <p>Table: {selectedTableData ? `T${selectedTableData.id}` : '-'}</p>
      </div>
    </div>
  );
};

export default Dashboard;
