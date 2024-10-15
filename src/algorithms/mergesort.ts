interface MergeSortNode {
  sorted: number[];
  unsorted: number[];
  left?: MergeSortNode;
  right?: MergeSortNode;
}

// Step 1/2
// Takes in two unsorted arrays, and returns two unsorted arrays
const splitArrayInTwo = (array: number[]): [number[], number[]] => {
  const middleIndex = Math.floor(array.length / 2);
  const firstHalf = array.slice(0, middleIndex);
  const secondHalf = array.slice(middleIndex);
  return [firstHalf, secondHalf];
};

// Step 2/2
const merge = (array1: number[], array2: number[]): number[] => {
  let result: number[] = [];
  const copy1 = [...array1];
  const copy2 = [...array2];

  while (copy1.length > 0 && copy2.length > 0) {
    if (copy1[0] < copy2[0]) {
      result.push(copy1.shift() as number);
    } else {
      result.push(copy2.shift() as number);
    }
  }

  if (copy1.length > 0) {
    result = result.concat(copy1);
  }
  if (copy2.length > 0) {
    result = result.concat(copy2);
  }

  return result;
};


// Iterative algorithms - for or a while loop
/**
 * let state = {}
 * 
 * for (let i = 0; i < array.length; i++) {
 *  state = {
 *    ...updateState
 *  }
 *  // Do the algorithm
 * }
 * 
 * console.log(state)
 *  */

// Recursive algorithms - a function that calls itself
/**
 * function() returnType {}
 * 
 * -> function() extendedReturnType {}
 * 
 * The extendedReturnType includes not only snapshots of the state, but also includes relationships between the states
 * 
 *  */


// takes in an array, and returns a sorted array
export const mergeSort = (array: number[]): MergeSortNode => {
  // Base case: single element or empty array
  if (array.length <= 1) {
    return {
      sorted: array,
      unsorted: array,
    };
  }

  // Split the array
  const [firstHalf, secondHalf] = splitArrayInTwo(array);

  // Recursively sort both halves
  const left = mergeSort(firstHalf);
  const right = mergeSort(secondHalf);

  // Merge the sorted halves
  const merged = merge(left.sorted, right.sorted);
 
  // Create and return the new node with merged results
  return {
    sorted: merged,
    unsorted: array,
    left,
    right,
  };
};

const unsortedArray = [6, 5, 3, 1, 8, 7, 2, 4];
const fullySortedRootNode = mergeSort(unsortedArray);

// Example usage
console.log(JSON.stringify(fullySortedRootNode, null, 2));
