export default function avg(arr) {
    return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0
};