const array = [6, 5, 3, 1, 8, 7, 2, 4];
// input depth 1
const afterFirstSplit = [[6, 5, 3, 1],[8, 7, 2, 4]]; // ->
// after second split
const afterSecondSplit = [
  [6, 5],
  [3, 1],
  [8, 7],
  [2, 4],
];

const afterSplitting = [[6], [5], [3], [1], [8], [7], [2], [4]];
const merge1 = [
  [5, 6],
  [1, 3],
  [7, 8],
  [2, 4],
];
// output of depth 1
const merge2 = [[1, 3, 5, 6],[2, 4, 7, 8]];
// arrays are sorted
const merge3 = [[1, 2, 3, 4, 5, 6, 7, 8]];


// Step 1/2
// Takes in two unsorted arrays, and returns two unsorted arrays
const splitArrayInTwo = (array: number[]) => {
  // declare the array
  const middleIndex = Math.floor(array.length / 2);

  const firstHalf = array.slice(0, middleIndex);
  const secondHalf = array.slice(middleIndex);

  return [firstHalf, secondHalf];
};

// Step 2/2
const merge = (array1: number[], array2: number[]) => {
  // declare the result
  let result: number[] = [];

  // while there are items in both arrays, compare the first item of each array
  // and push the smaller item to the result
  while (array1.length > 0 && array2.length > 0) {
    if (array1[0] < array2[0]) {
      result.push(array1.shift() as number);
    } else {
      result.push(array2.shift() as number);
    }
  }

  // if there are any remaining items in either array, add them to the result
  if (array1.length > 0) {
    result = result.concat(array1);
  }
  if (array2.length > 0) {
    result = result.concat(array2);
  }

  return result;
};

const array1 = [1, 3, 4, 5, 7];
const array2 = [2, 4, 6, 8, 9, 10, 15, 20];

/**
Divide the unsorted list into n sublists, each containing one element (a list of one element is considered sorted).

Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining. This will be the sorted list.
 */

// split the array into two items
// merge the two items (mergesort sorts the items)
// repeat until one item

const mergingArray = [1, 2, 3, 4, 5, 6, 7, 8]; // <-
const unsortedArray = [6, 5, 3, 1, 8, 7, 2];
const sortedArray1 = [5, 7];
const sortedArray2 = [4, 6, 8];

// takes in an array, and returns a sorted array
const mergeSort = (array: number[], depth: number) => {
  // base case
  if (array.length <= 1) {
    return array;
  }

  // we have two unsorted arrays
  const [firstHalf, secondHalf] = splitArrayInTwo(array);
//   console.log("split", firstHalf, secondHalf);

  // sort them by breaking them down
  const sortedFirstHalf = mergeSort(firstHalf, depth + 1);
  const sortedSecondHalf = mergeSort(secondHalf, depth + 1);

  // merge them back together
  const merged = merge(sortedFirstHalf, sortedSecondHalf);
  return merged;
};

console.log(mergeSort(unsortedArray, 0));
