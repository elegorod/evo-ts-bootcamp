import BinaryTree, { TreeNode, TraverseType, BinarySearchTree } from './BinaryTree'
import SimpleBinaryTree from './SimpleBinaryTree'

export default class SimpleBinarySearchTree extends SimpleBinaryTree<number> implements BinarySearchTree {

  has(value: number): boolean {
    function hasInternal(node: TreeNode<number>): boolean {
      return node.value === value ||
        (node.left ? hasInternal(node.left) : false) ||
        (node.right ? hasInternal(node.right) : false)
    }

    return hasInternal(this.root)
  }

}