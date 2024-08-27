import React, { useState } from 'react';

const ProgressBar = () => {
  const [volume, setVolume] = useState(50); // Initial volume level (0-100)

  const handleChange = (e) => {
    setVolume(e.target.value);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleChange}
        className="w-full h-2 bg2 rounded-lg cursor-pointer appearance-none range-thumb:bg-blue-500 range-thumb:rounded-full"
      />
      <span className="text-gray-700">{volume}%</span>
    </div>
  );
};

export default ProgressBar;
