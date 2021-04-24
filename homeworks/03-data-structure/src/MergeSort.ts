
export interface Comparator<T> {
  (a: T, b: T): number
}

export function sort<T>(array: T[], comparator: Comparator<T>): T[] {
  if (array.length < 2) {
    return array
  }
  const half = array.length / 2
  const left = array.slice(0, half)
  const right = array.slice(half)
  return merge(sort(left, comparator), sort(right, comparator), comparator)
}

function merge<T>(left: T[], right: T[], comparator: Comparator<T>): T[] {
  const start: T[] = []
  while (left.length && right.length) {
    if (comparator(left[0], right[0]) < 0) {
      start.push(left.shift() as T)
    } else {
      start.push(right.shift() as T)
    }
  }
  return [...start, ...left, ...right]
}
