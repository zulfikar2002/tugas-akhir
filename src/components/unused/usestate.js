

import React, { useState } from 'react';

export default function Add() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="flex items-center">
      <button
        className="px-3 py-1 rounded-l-lg bg-gray-300 hover:bg-gray-400"
        onClick={decrement}
      >
        -
      </button>
      <input
        type="number"
        value={count}
        className="px-3 py-1 rounded-none bg-gray-100"
      />
      <button
        className="px-3 py-1 rounded-r-lg bg-gray-300 hover:bg-gray-400"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
}