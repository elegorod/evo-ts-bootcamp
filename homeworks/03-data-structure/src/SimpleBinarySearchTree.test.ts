import BinaryTree, { TreeNode, TraverseType, BinarySearchTree } from './BinaryTree'
import SimpleBinarySearchTree from './SimpleBinarySearchTree'
import { N, sort } from './TestHelper'

describe("Simple binary search tree", () => {

  /** Test tree:
   *      0
   *     / \
   *    1   3
   *   /   / \
   *  2   4   6
   *       \
   *        5
   */
  const root = N(0,
    N(1, N(2)),
    N(3,
      N(4, undefined, N(5)),
      N(6))
  )
  const tree = new SimpleBinarySearchTree(root)

  const SingleRootValue = 20
  const singleTree = new SimpleBinarySearchTree(N(SingleRootValue))

  describe("has()", () => {
    it.each([0, 1, 2, 3, 4, 5, 6]
    )("finds number %i", i => {
      expect(tree.has(i)).toBe(true)
    })

    it.each([-25, 25]
    )("doesn't find number %i", i => {
      expect(tree.has(i)).toBe(false)
    })
  })

  describe("has() for single tree", () => {
    it("finds root value", () => {
      expect(singleTree.has(SingleRootValue)).toBe(true)
    })

    it.each([SingleRootValue - 1, SingleRootValue + 1, SingleRootValue + 100]
    )("doesn't find number %i", i => {
      expect(singleTree.has(i)).toBe(false)
    })
  })
  
  test("getRoot() returns root", () => {
    expect(tree.getRoot()).toBe(root)
  })

  test("setRoot() replaces root and returns this", () => {
    const testTree = new SimpleBinarySearchTree(root)
    const newRoot = N(25)

    const result = testTree.setRoot(newRoot)

    expect(testTree.getRoot()).toBe(newRoot)
    expect(result).toBe(testTree)
  })

  describe("traverse() pre-order", () => {
    it("returns proper sequence of values", () => {
      expect(tree.traverse(TraverseType.PreOrder)).toEqual([0, 1, 2, 3, 4, 5, 6])
    })
  })

  describe("traverse() in-order", () => {
    it("returns proper sequence of values", () => {
      expect(tree.traverse(TraverseType.InOrder)).toEqual([2, 1, 0, 4, 5, 3, 6])
    })
  })

  describe("traverse() post-order", () => {
    it("returns proper sequence of values", () => {
      expect(tree.traverse(TraverseType.PostOrder)).toEqual([2, 1, 5, 4, 6, 3, 0])
    })
  })

  describe("traverse() breadth", () => {
    it("returns proper sequence of values", () => {
      expect(tree.traverse(TraverseType.Breadth)).toEqual([0, 1, 3, 2, 4, 6, 5])
    })
  })

  describe("getColumn() for big tree", () => {
    it("returns values for column 0", () => {
      expect(sort(tree.getColumn(0))).toEqual([0, 4])
    })

    it("returns values for column -1", () => {
      expect(sort(tree.getColumn(-1))).toEqual([1])
    })

    it("returns values for column -2", () => {
      expect(sort(tree.getColumn(-2))).toEqual([2])
    })

    it("returns values for column 1", () => {
      expect(sort(tree.getColumn(1))).toEqual([3, 5])
    })

    it("returns values for column 2", () => {
      expect(sort(tree.getColumn(2))).toEqual([6])
    })

    it("returns no values for column 3", () => {
      expect(sort(tree.getColumn(3))).toEqual([])
    })
  })

})