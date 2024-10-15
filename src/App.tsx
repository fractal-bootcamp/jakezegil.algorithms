import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mergeSort } from "./algorithms/mergesort";

interface MergeSortNode {
  sorted: number[];
  unsorted: number[];
  left?: MergeSortNode;
  right?: MergeSortNode;
}

const useVisualizeMergeSort = (initialArray: number[]) => {
  const [sortTree, setSortTree] = useState<MergeSortNode | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<MergeSortNode[]>([]);

  useEffect(() => {
    const tree = mergeSort(initialArray);
    setSortTree(tree);
    setSteps(flattenTree(tree));
  }, [initialArray]);

  const flattenTree = (node: MergeSortNode): MergeSortNode[] => {
    const result: MergeSortNode[] = [node];
    if (node.left) result.push(...flattenTree(node.left));
    if (node.right) result.push(...flattenTree(node.right));
    return result;
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return { sortTree, currentStep, steps, nextStep, prevStep };
};

const ArrayVisualization: React.FC<{
  numbers: number[];
  isSorted: boolean;
}> = ({ numbers, isSorted }) => {
  return (
    <motion.div className="flex justify-center space-x-2 my-2">
      {numbers.map((num, index) => (
        <motion.div
          key={`${num}-${index}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`
            flex
            h-10
            items-center
            justify-center
            rounded
            text-white
            w-10
            ${isSorted ? "bg-green-500" : "bg-blue-500"}
          `}
        >
          {num}
        </motion.div>
      ))}
    </motion.div>
  );
};

const MergeSortVisualization: React.FC<{
  node: MergeSortNode;
  depth: number;
}> = ({ node, depth }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="border border-gray-300 flex flex-col items-center m-2 p-4 rounded"
      style={{ width: `${100 - depth * 10}%` }}
    >
      <div className="bg-gray-100 mb-4 p-4 rounded w-full">
        <h3 className="font-bold mb-2 text-center text-lg">Unsorted</h3>
        <ArrayVisualization numbers={node.unsorted} isSorted={false} />
      </div>
      <div className="bg-gray-100 mb-4 p-4 rounded w-full">
        <h3 className="font-bold mb-2 text-center text-lg">Sorted</h3>
        <ArrayVisualization numbers={node.sorted} isSorted={true} />
      </div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center w-full"
      >
        {node.left && (
          <MergeSortVisualization node={node.left} depth={depth + 1} />
        )}
        {node.right && (
          <MergeSortVisualization node={node.right} depth={depth + 1} />
        )}
      </motion.div>
    </motion.div>
  );
};

function App() {
  const initialArray = [6, 5, 3, 1, 8, 7, 2, 4];
  const { sortTree, currentStep, steps, nextStep, prevStep } =
    useVisualizeMergeSort(initialArray);

  return (
    <div className="container mx-auto p-4">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="font-bold mb-4 text-2xl text-center"
      >
        Merge Sort Visualization
      </motion.h1>
      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={prevStep}
          className="bg-blue-500 font-bold hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          Previous Step
        </button>
        <button
          onClick={nextStep}
          className="bg-green-500 font-bold hover:bg-green-700 px-4 py-2 rounded text-white"
        >
          Next Step
        </button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
        >
          {steps[currentStep] && (
            <MergeSortVisualization node={steps[currentStep]} depth={0} />
          )}
        </motion.div>
      </AnimatePresence>
      {sortTree && (
        <div className="mt-8">
          <h2 className="font-bold mb-2 text-center text-xl">
            Full Merge Sort Tree
          </h2>
          <MergeSortVisualization node={sortTree} depth={0} />
        </div>
      )}
    </div>
  );
}

export default App;
