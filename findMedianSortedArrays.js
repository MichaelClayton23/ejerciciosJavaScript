/*Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
The overall run time complexity should be O(log (m+n)).

Example 1:
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.*/
var findMedianSortedArrays = function (nums1, nums2) {
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }
    let m=nums1.length;
    let n=nums2.length;
    let low=0;
    let high=m;

    let halfLen=Math.floor((m+n+1)/2);

    console.log("Nums1:", nums1);
    console.log("Nums2:", nums2);
    console.log("------------------------------");

    while(low<=high){
        let i=Math.floor((low+high)/2);
        let j=halfLen-i;

        let maxLeftX=(i===0)?Number.MIN_SAFE_INTEGER:nums1[i-1];
        let minRightX=(i===m)?Number.MAX_SAFE_INTEGER:nums1[i];
        let maxLeftY=(j===0)?Number.MIN_SAFE_INTEGER:nums2[j-1];
        let minRightY=(j===n)?Number.MAX_SAFE_INTEGER:nums2[j];

        console.log("leftX:", i===0?Number.MIN_SAFE_INTEGER:nums1.slice(0,i));
        console.log("rightX:", i===m?Number.MAX_SAFE_INTEGER:nums1.slice(i));
        console.log("leftY:", j===0?Number.MIN_SAFE_INTEGER:nums2.slice(0,j));
        console.log("rightY:", j===n?Number.MAX_SAFE_INTEGER:nums2.slice(j));

        console.log("Values: maxLeftX =", maxLeftX, ", minRightY =", minRightY, ", maxLeftY =", maxLeftY, ", minRightX =", minRightX);
        if(maxLeftX<=minRightY && maxLeftY<=minRightX){
            console.log("Found correct partition: maxLeftX =", maxLeftX, ", minRightY =", minRightY, ", maxLeftY =", maxLeftY, ", minRightX =", minRightX);
            if((m+n)%2===0){
                return (Math.max(maxLeftX,maxLeftY)+Math.min(minRightX,minRightY))/2;
            }
            else{
                return Math.max(maxLeftX,maxLeftY);
            }
        }
        if(i<m && nums2[j-1]>nums1[i]){
            low=i+1;
            console.log("Moving right++ X and left-- Y: low =", low, "high =", high);
        }
        else if(i>0 && nums1[i-1]>nums2[j]){
            high=i-1;
            console.log("Moving left-- X and right++ Y: low =", low, "high =", high);
        }   
    }
}

console.log(findMedianSortedArrays([1,3,5,7,9],[2,4,6,8,10]));