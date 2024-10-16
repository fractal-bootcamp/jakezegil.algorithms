interface BubbleSortStep {
  array: number[];
  swapped: boolean;
  comparedIndices: [number, number];
}

// Function to swap two elements in an array
const swap = (arr: number[], i: number, j: number): void => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

export const bubbleSort = (array: number[]): BubbleSortStep[] => {
  const steps: BubbleSortStep[] = [];
  const { length } = array;
  let swapped: boolean;

  // Outer loop: each pass through the array
  for (let outer = 0; outer < length - 1; outer++) {
    swapped = false;

    // Inner loop: compare adjacent elements
    for (let inner = 0; inner < length - outer - 1; inner++) {
      // Record the current state before comparison
      steps.push({
        array: [...array],
        swapped: false,
        comparedIndices: [inner, inner + 1],
      });

      // If elements are in wrong order, swap them
      if (array[inner] > array[inner + 1]) {
        swap(array, inner, inner + 1);
        swapped = true;

        // Record the state after swapping
        steps.push({
          array: [...array],
          swapped: true,
          comparedIndices: [inner, inner + 1],
        });
      }
    }

    // If no swapping occurred in this pass, the array is sorted
    if (!swapped) break;
  }

  return steps;
};

// Example usage
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const sortingSteps = bubbleSort(unsortedArray);

console.log(JSON.stringify(sortingSteps, null, 2));
