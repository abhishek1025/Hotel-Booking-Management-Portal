import React, { useState } from 'react';

const SearchFilter = ({ onSearch }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [roomType, setRoomType] = useState('');
  const [numRooms, setNumRooms] = useState(1);

  const handleSearch = () => {
    onSearch({ startDate, endDate, roomType, numRooms });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg flex flex-wrap justify-between items-center mb-4">
      <div className="flex flex-col mb-2">
        <label htmlFor="start-date" className="text-gray-700 mb-1">
          Start Date
        </label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded-lg"
        />
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="end-date" className="text-gray-700 mb-1">
          End Date
        </label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded-lg"
        />
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="room-type" className="text-gray-700 mb-1">
          Room Type
        </label>
        <input
          type="text"
          id="room-type"
          placeholder="Room Type"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          className="p-2 border rounded-lg"
        />
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="num-rooms" className="text-gray-700 mb-1">
          Number of Rooms
        </label>
        <input
          type="number"
          id="num-rooms"
          value={numRooms}
          onChange={(e) => setNumRooms(e.target.value)}
          min="1"
          className="p-2 border rounded-lg"
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchFilter;
