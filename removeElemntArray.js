var removeElement = function(nums, val) {
    let counter = 0;
    nums.sort(function (a, b) {  return a - b;});
    const length = nums.length;
    for (let i=length-1;i>=0;i--){
        if (nums[i]===val){
            nums.splice(i,1);
            counter++;
        }
    }
    return nums;    
};


console.log(removeElement([3,2,2,3],3));