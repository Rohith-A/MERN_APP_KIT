export const binary = (target, arr) => {
    debugger
    if (!target) {
        return null;
    } else {
    arr = arr.sort((a, b) => a - b) // sort the array
    let half = parseInt(arr.length / 2) // half is half of the length of array which is used to divide array into two halfs
    if (target === arr[half]._id) { // return half if the target is available in arr[half]
        return half;
    }
    if (target > arr[half]._id) { // this if block checks if target is greater than element in arr[half]
        // if greater then ignores first half and call binarySearch function again with 2nd half array elements and target
        let newArr = arr.slice(half, arr.length)
        return half + binary(target, newArr); // recursion with half array elements which will return the index of target in second half element and add half var and return
    }
    else { // this else block is executed when target is less than the element in arr[half]
        // if lesser then ignores second half and call binarySearch function again with 1st half array elements and target
        let newArr = arr.slice(0, half)
        return binary(target, newArr); // recursion with half array elements which will return the index of target in first half element and add half var and return
    }
}
}