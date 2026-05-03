export default function pct(arr, pred) {
    return arr.length ? (arr.filter(pred).length / arr.length) * 100 : 0
};