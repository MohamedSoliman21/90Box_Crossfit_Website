import React from 'react';

const Loading: React.FC = () => {
  const getRandomGifNumber = () => {
    const min = 1;
    const max = 2;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <div className="flex justify-center items-center h-fit">
      <img src={`http://localhost:3000/Loading/${getRandomGifNumber()}.gif`} alt="Dumbbell Up" />
    </div>
  );
};

export default Loading;
