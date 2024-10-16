import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MergeSortVisualization from './MergeSort';
import BubbleSortVisualization from './BubbleSort';

const useAlgorithmToggle = () => {
  const [currentAlgorithm, setCurrentAlgorithm] = useState<'merge' | 'bubble'>('merge');

  const toggleAlgorithm = () => {
    setCurrentAlgorithm(prev => prev === 'merge' ? 'bubble' : 'merge');
  };

  return { currentAlgorithm, toggleAlgorithm };
};

function App() {
  const { currentAlgorithm, toggleAlgorithm } = useAlgorithmToggle();

  return (
    <div className="container mx-auto p-4">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="font-bold mb-4 text-2xl text-center"
      >
        Sorting Algorithm Visualization
      </motion.h1>
      <div className="flex justify-center mb-4">
        <button
          onClick={toggleAlgorithm}
          className="bg-purple-500 font-bold hover:bg-purple-700 px-4 py-2 rounded text-white"
        >
          Toggle Algorithm: {currentAlgorithm === 'merge' ? 'Merge Sort' : 'Bubble Sort'}
        </button>
      </div>
      {currentAlgorithm === 'merge' ? <MergeSortVisualization /> : <BubbleSortVisualization />}
    </div>
  );
}

export default App;
