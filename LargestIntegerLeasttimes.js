var largestInteger = function(nums, k) {
    const counts = new Map();
   
    // Loop through each starting index ofthe subarrays of size k
    for (let i= 0; i <= nums.length - k; i++) {
        // Use a St to track unique numbers in the current subarray
        const uniqueInSubarray = new Set();
        for (let j = 0; j < k; j++) {
            uniqueInSubarray.add(nums[i+ j]);
        }
       
        // Increment the frequency count for each unique number in this subarray
        for (const num of uniqueInSubarray) {
            counts.set(num, (counts.get(num) || 0)+ 1);
        }
    }
    let maxAlmostMissing = -1;
   
    // Find numbers that appear in exactly 1 subarray and find the largest one
    for (const [num, count] of counts) {
        if (count === 1) {
            if (num > maxAlmostMissing) {
                maxAlmostMissing = num;
            }
        }
    }
   
    return maxAlmostMissing;
};


var largestInteger = function(nums, k) {
    const n = nums.length;
   
    // Case 1: Only one subarray exists (the entire array)
    if (k === n) {
        let maxVal = nums[0];
        for (let i = 1; i < n; i++) {
            if (nums[i] > maxVal) maxVal = nums[i];
        }
        return maxVal;
    }
   
    // Count frequencies of all elements
    const counts = new Map();
    for (const num of nums) {
        counts.set(num, (counts.get(num) || 0) + 1);
    }
   
    // Case 2: Each element is its own subarray (k = 1)
    if (k === 1) {
        let maxAlmostMissing = -1;
        for (const [num, count] of counts) {
            if (count === 1 && num > maxAlmostMissing) {
                maxAlmostMissing = num;
            }
        }
        return maxAlmostMissing;
    }
   
    // Case 3: 1 < k < n
    // Only the first and last elements can be part of exactly one subarray
    let candidate1 = -1;
    let candidate2 = -1;
   
    if (counts.get(nums[0]) === 1) {
        candidate1 = nums[0];
    }
    if (counts.get(nums[n - 1]) === 1) {
        candidate2 = nums[n - 1];
    }
   
    return candidate1 > candidate2 ? candidate1 : candidate2;
};
