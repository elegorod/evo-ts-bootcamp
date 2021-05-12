import { TreeNode, BinarySearchTreeBase } from './BinaryTreeBase'
import BinaryTree from './BinaryTree'

export default class BinarySearchTree extends BinaryTree<number> implements BinarySearchTreeBase {

  public has(value: number): boolean {
    function hasInternal(node: TreeNode<number>): boolean {
      return node.value === value ||
        (node.left ? hasInternal(node.left) : false) ||
        (node.right ? hasInternal(node.right) : false)
    }

    return hasInternal(this.root)
  }

}