import BinaryTree, { TreeNode, TraverseType } from './BinaryTree'
import SimpleBinaryTree from './SimpleBinaryTree'
import {N, sort} from './TestHelper'

describe("Simple binary tree", () => {
  /** Test tree:
   *          0
   *        _/ \_
   *       /     \
   *      1       7
   *     / \     / \
   *    2   6   8   9
   *   / \         /
   *  3   4       10
   *       \
   *        5
   */
  const root = N(0,
      N(1,
        N(2,
          N(3),
          N(4, undefined, N(5))),
        N(6)),
      N(7,
        N(8),
        N(9, N(10)))
    )
  const tree = new SimpleBinaryTree(root)

  const SingleRootValue = 20
  const singleTree = new SimpleBinaryTree(N(SingleRootValue))

  test("getRoot() returns root", () => {
    expect(tree.getRoot()).toBe(root)
  })

  test("setRoot() replaces root and returns this", () => {
    given:
    const testTree = new SimpleBinaryTree(root)
    const newRoot = N(25)

    when:
    const result = testTree.setRoot(newRoot)

    then:
    expect(testTree.getRoot()).toBe(newRoot)
    expect(result).toBe(testTree)
  })

  describe("traverse() pre-order", () => {
    it("returns single value for single tree", () => {
      expect(singleTree.traverse(TraverseType.PreOrder)).toEqual([SingleRootValue])
    })

    it("returns proper sequence of values", () => {
      expect(tree.traverse(TraverseType.PreOrder)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })
  })

  describe("traverse() in-order", () => {
    it("returns single value for single tree", () => {
      expect(singleTree.traverse(TraverseType.InOrder)).toEqual([SingleRootValue])
    })

    it("returns proper sequence of values", () => {
      expect(tree.traverse(TraverseType.InOrder)).toEqual([3, 2, 4, 5, 1, 6, 0, 8, 7, 10, 9])
    })
  })

  describe("traverse() post-order", () => {
    it("returns single value for single tree", () => {
      expect(singleTree.traverse(TraverseType.PostOrder)).toEqual([SingleRootValue])
    })

    it("returns proper sequence of values", () => {
      expect(tree.traverse(TraverseType.PostOrder)).toEqual([3, 5, 4, 2, 6, 1, 8, 10, 9, 7, 0])
    })
  })

  describe("traverse() breadth", () => {
    it("returns single value for single tree", () => {
      expect(singleTree.traverse(TraverseType.Breadth)).toEqual([SingleRootValue])
    })

    it("returns proper sequence of values", () => {
      expect(tree.traverse(TraverseType.Breadth)).toEqual([0, 1, 7, 2, 6, 8, 9, 3, 4, 10, 5])
    })
  })

  describe("getColumn() for single tree", () => {
    it("returns single value for column 0", () => {
      expect(singleTree.getColumn(0)).toEqual([SingleRootValue])
    })

    it.each([1, -1]
    )("returns empty array for column %i", i => {
      expect(singleTree.getColumn(i)).toEqual([])
    })
  })

  describe("getColumn() for big tree", () => {
    it("returns values for column 0", () => {
      expect(sort(tree.getColumn(0))).toEqual([0, 5, 6, 8])
    })

    it("returns values for column -1", () => {
      expect(sort(tree.getColumn(-1))).toEqual([1, 4])
    })

    it("returns values for column -2", () => {
      expect(sort(tree.getColumn(-2))).toEqual([2])
    })

    it("returns values for column 1", () => {
      expect(sort(tree.getColumn(1))).toEqual([7, 10])
    })

    it("returns values for column 2", () => {
      expect(sort(tree.getColumn(2))).toEqual([9])
    })

    it("returns no values for column 3", () => {
      expect(sort(tree.getColumn(3))).toEqual([])
    })

    it("returns no values for column 100", () => {
      expect(sort(tree.getColumn(100))).toEqual([])
    })
  })

})