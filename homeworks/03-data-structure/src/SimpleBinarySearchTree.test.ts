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
      N(4, N(5)),
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

})