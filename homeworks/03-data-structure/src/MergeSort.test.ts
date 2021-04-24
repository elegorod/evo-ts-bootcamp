import {sort, Comparator} from './MergeSort'

describe("Merge sort", () => {

  const cn: Comparator<number> = (a, b) => a - b

  it("returns empty array for empty input", () => {
    expect(sort([], cn)).toEqual([])
  })

  it("sorts array with 1 element", () => {
    expect(sort([1], cn)).toEqual([1])
  })

  it("sorts array with 2 elements", () => {
    expect(sort([2, 1], cn)).toEqual([1, 2])
  })

  it.each([
    [[1, 2, 3], [1, 2, 3]],
    [[1, 3, 2], [1, 2, 3]],
    [[2, 1, 3], [1, 2, 3]],
    [[2, 3, 1], [1, 2, 3]],
    [[3, 1, 2], [1, 2, 3]],
    [[3, 2, 1], [1, 2, 3]]
  ])("sorts array with 3 elements %o", (array, expected) => {
    expect(sort(array, cn)).toEqual(expected)
  })

  it.each([
    [[5, 5, 5, 5], [5, 5, 5, 5]],
    [[5, 5, 1, 5], [1, 5, 5, 5]],
    [[5, 10, 5, 5], [5, 5, 5, 10]],
  ])("sorts array with repeated elements %o", (array, expected) => {
    expect(sort(array, cn)).toEqual(expected)
  })

  it.each([
    [[3, -2, 10, -1], [-2, -1, 3, 10]],
    [[1, 8, -4, 5], [-4, 1, 5, 8]],
    [[29, 58, 94, 72, 16, 36, 25, 38, 13, 61], [13, 16, 25, 29, 36, 38, 58, 61, 72, 94]],
    [
      [59, 55, 37, 56, 48, 76, 32, 54, 36, 49, 57, 72, 3, 35, 75, 64, 2, 17, 15, 28, 19, 97, 90, 53, 80, 79, 30, 43, 13, 40], 
      [2, 3, 13, 15, 17, 19, 28, 30, 32, 35, 36, 37, 40, 43, 48, 49, 53, 54, 55, 56, 57, 59, 64, 72, 75, 76, 79, 80, 90, 97]
    ]
  ])("sorts array %o", (array, expected) => {
    expect(sort(array, cn)).toEqual(expected)
  })

  it("doesn't mutate original array", () => {
    const array = [7, 4, 1, 2]
    const copy = array.slice()
    sort(array, cn)
    expect(array).toEqual(copy)
  })

  it("sorts strings", () => {
    const array = ["banana", "pear", "cherry", "apple"]
    const cs: Comparator<string> = (a, b) => a.localeCompare(b, 'en')
    expect(sort(array, cs)).toEqual(["apple", "banana", "cherry", "pear"])
  })

  it("sorts string descending", () => {
    const array = ["banana", "pear", "cherry", "apple"]
    const csDesc: Comparator<string> = (a, b) => b.localeCompare(a, 'en')
    expect(sort(array, csDesc)).toEqual(["pear", "cherry", "banana", "apple"])
  })

  it("sorts custom objects", () => {
    type Planet = {
      name: string;
      index: number;
    }
    const array: Array<Planet> = [
      {name: "Earth", index: 3},
      {name: "Mercury", index: 1},
      {name: "Mars", index: 4},
      {name: "Venus", index: 2}
    ]
    const c: Comparator<Planet> = (a, b) => a.index - b.index
    expect(sort(array, c)).toEqual([
      {name: "Mercury", index: 1},
      {name: "Venus", index: 2},
      {name: "Earth", index: 3},
      {name: "Mars", index: 4}
    ])
  })

})