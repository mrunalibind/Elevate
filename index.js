 function nextGreaterElement(arr){
    let stack = [];
    let result = new Array(arr.length).fill(-1);
    for(let i = arr.length-1;i>=0;i--){
        while(stack.length > 0 && stack[stack.length-1] <= arr[i]){
            stack.pop();
        }
        if(stack.length === 0){
            result[i] = -1;
        }
        else{
            result[i] = stack[stack.length-1];
        }
        stack.push(arr[i]);
    }
    return result;
}
console.log(nextGreaterElement([4,5,2,10])); // [5,10,10,-1]
// time complexity: O(n) because each element is pushed and popped at most once
// space complexity: O(n)