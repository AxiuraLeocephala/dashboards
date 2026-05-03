export default function groupBy(arr, key) {
    return arr.reduce((acc, r) => { 
        (acc[r[key]] = acc[r[key]] || []).push(r); 
        return acc; 
    }, {})
};