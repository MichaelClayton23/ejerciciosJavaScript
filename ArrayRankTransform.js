Given an array of integers arr, replace each element with its rank.

The rank represents how large the element is. The rank has the following rules:

Rank is an integer starting from 1.
The larger the element, the larger the rank. If two elements are equal, their rank must be the same.
Rank should be as small as possible.
 

Example 1:

Input: arr = [40,10,20,30]
Output: [4,1,2,3]
Explanation: 40 is the largest element. 10 is the smallest. 20 is the second smallest. 30 is the third smallest.



/**
 * @param {number[]} arr
 * @return {number[]}
 */
var arrayRankTransform = function (arr) {
    //ordenas y aguantas indice y luego foreach
    if (arr === null || arr === undefined || arr.length === 0) {
        return arr;
    }
    const sortedWithIndices = arr
        .map((value, idx) => ({ value, previousIndex: idx }))
        .sort((a, b) => a.value - b.value);
    let rank = 1;
    let value = sortedWithIndices[0].value;
    sortedWithIndices[0] = {
        ...sortedWithIndices[0],
        rank: rank
    };
    for (let i = 1; i < arr.length; i++) {
        if (sortedWithIndices[i].value !== sortedWithIndices[i - 1].value) {
            rank++;
        }
        sortedWithIndices[i] = {
            ...sortedWithIndices[i],
            rank: rank
        };
    }
    //ordenas por idx 
    return sortedWithIndices.sort((a,b)=> a.previousIndex-b.previousIndex).map(a => a.rank);                
};



Improved Vrsion

var arrayRankTransform = function (arr) {
    // 1. Get unique numbers and sort them ascending
    const uniqueSorted = [...new Set(arr)].sort((a, b) => a - b);
    
    // 2. Map each number to its rank (its index in the sorted array + 1)
    const rankMap = new Map();
    uniqueSorted.forEach((num, index) => {
        rankMap.set(num, index + 1);
    });
    
    // 3. Replace each element in the original array with its rank from the map
    return arr.map(num => rankMap.get(num));
};


Visualizing the ExecutionLet's trace the code using an array with duplicates: arr = [10, 40, 10, 20]
Step 1: Get unique numbers and sort themnew Set([10, 40, 10, 20]) becomes [10, 40, 20] 
(The second 10 is removed completely)..sort((a, b) => a - b) sorts it into: uniqueSorted = [10, 20, 40].
Step 2: Map each unique number to its rankWe loop through uniqueSorted and store the ranks in our Map structure:
10 is at index 0 $\rightarrow$ rankMap.set(10, 1)20 is at index 1 $\rightarrow$ rankMap.set(20, 2)40 is at index 2 
$\rightarrow$ rankMap.set(40, 3)
Our lookup map looks like this: { 10 => 1, 20 => 2, 40 => 3 }
Step 3: Replace the original array valuesFinally, we run .map() over the original array [10, 40, 10, 20], 
asking the map for the rank of each number:
First element is 10 $\rightarrow$ map returns 1
Second element is 40 $\rightarrow$ map returns 3
Third element is 10 $\rightarrow$ map returns 1 (Both 10s get the exact same rank!)
Fourth element is 20 $\rightarrow$ map returns 2
Final Output: [1, 3, 1, 2]