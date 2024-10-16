import React, { useState, useEffect, useCallback } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { bubbleSort } from "./algorithms/bubblesort";

interface BubbleSortStep {
  array: number[];
  swapped: boolean;
  comparedIndices: [number, number];
}

const useBubbleSortVisualization = (initialArray: number[]) => {
  const [steps, setSteps] = useState<BubbleSortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500); // milliseconds

  useEffect(() => {
    setSteps(bubbleSort(initialArray));
  }, [initialArray]);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isPlaying && currentStep < steps.length - 1) {
      intervalId = setInterval(nextStep, speed);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, currentStep, steps.length, speed, nextStep]);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  const changeSpeed = (newSpeed: number) => setSpeed(newSpeed);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  return { currentStep, steps, nextStep, prevStep, isPlaying, togglePlay, speed, changeSpeed, reset };
};

const ArrayElement: React.FC<{
  num: number;
  isCompared: boolean;
  isSwapped: boolean;
}> = ({ num, isCompared, isSwapped }) => {
  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5,
      }}
      className={`
        flex
        items-center
        justify-center
        rounded
        text-white
        w-10
        ${
          isCompared
            ? isSwapped
              ? "bg-green-500"
              : "bg-red-500"
            : "bg-blue-500"
        }
      `}
      style={{ height: `${num * 3}px` }}
    >
      {num}
    </motion.div>
  );
};

const ArrayVisualization: React.FC<{
  numbers: number[];
  comparedIndices: [number, number];
  swapped: boolean;
}> = ({ numbers, comparedIndices, swapped }) => {
  return (
    <motion.div layout className="flex justify-center my-2 space-x-2">
      <LayoutGroup>
        {numbers.map((num, index) => (
          <ArrayElement
            key={`${num}-${index}`}
            num={num}
            isCompared={comparedIndices.includes(index)}
            isSwapped={swapped && comparedIndices.includes(index)}
          />
        ))}
      </LayoutGroup>
    </motion.div>
  );
};

const BubbleSortVisualization: React.FC = () => {
  const initialArray = [64, 34, 25, 12, 22, 11, 90, 82, 45, 30, 55, 17, 73, 38, 96, 5, 60, 28, 50, 40];
  const { currentStep, steps, nextStep, prevStep, isPlaying, togglePlay, speed, changeSpeed, reset } =
    useBubbleSortVisualization(initialArray);

  return (
    <div className="container mx-auto p-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-bold mb-4 text-2xl text-center"
        transition={{ duration: 0.8 }}
      >
        Bubble Sort Visualization
      </motion.h1>
      <div className="flex flex-col items-center mb-4 space-y-4">
        <div className="flex justify-center space-x-4">
          <button
            className="bg-blue-500 font-bold hover:bg-blue-700 px-4 py-2 rounded text-white"
            onClick={prevStep}
            disabled={isPlaying}
          >
            Previous Step
          </button>
          <button
            className="bg-green-500 font-bold hover:bg-green-700 px-4 py-2 rounded text-white"
            onClick={nextStep}
            disabled={isPlaying}
          >
            Next Step
          </button>
          <button
            className={`font-bold px-4 py-2 rounded text-white ${
              isPlaying ? "bg-red-500 hover:bg-red-700" : "bg-green-500 hover:bg-green-700"
            }`}
            onClick={togglePlay}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            className="bg-yellow-500 font-bold hover:bg-yellow-700 px-4 py-2 rounded text-white"
            onClick={reset}
          >
            Reset
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-bold">Speed:</span>
          <input
            type="range"
            min="100"
            max="1000"
            step="100"
            value={speed}
            onChange={(e) => changeSpeed(Number(e.target.value))}
            className="w-64"
          />
          <span>{speed}ms</span>
        </div>
      </div>
      {steps[currentStep] && (
        <ArrayVisualization
          comparedIndices={steps[currentStep].comparedIndices}
          numbers={steps[currentStep].array}
          swapped={steps[currentStep].swapped}
        />
      )}
    </div>
  );
};

export default BubbleSortVisualization;
