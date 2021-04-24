import BinaryTree, { TreeNode, TraverseType } from './BinaryTree'

export default class SimpleBinaryTree<T> implements BinaryTree<T> {

  constructor(protected root: TreeNode<T>) {
  }

  getRoot(): TreeNode<T> {
    return this.root
  }

  setRoot(root: TreeNode<T>): this {
    this.root = root
    return this
  }

  traverse(traverseType: TraverseType): T[] {
    function traverseInternal(node: TreeNode<T>, traverseType: TraverseType): T[] {
      let result: T[] = []

      function traverseChild(child?: TreeNode<T>) {
        if (child) {
          result = result.concat(traverseInternal(child, traverseType))
        }
      }

      switch (traverseType) {
        case TraverseType.PreOrder:
          result.push(node.value)
          traverseChild(node.left)
          traverseChild(node.right)
          break
        case TraverseType.InOrder:
          traverseChild(node.left)
          result.push(node.value)
          traverseChild(node.right)
          break
        case TraverseType.PostOrder:
          traverseChild(node.left)
          traverseChild(node.right)
          result.push(node.value)
          break
        case TraverseType.Breadth:
          const queue: Array<TreeNode<T>> = []
          queue.push(node)
          while (queue.length > 0) {
            const n = queue.shift() as TreeNode<T>
            result.push(n.value)
            if (n.left) {
              queue.push(n.left)
            }
            if (n.right) {
              queue.push(n.right)
            }
          }
          break
      }
      return result
    }

    return traverseInternal(this.root, traverseType)
  }

  getColumn(column: number): T[] {
    const result: T[] = []

    function iterate(node: TreeNode<T>, current: number) {
      if (current === column) {
        result.push(node.value)
      }
      if (node.left) {
        iterate(node.left, current - 1)
      }
      if (node.right) {
        iterate(node.right, current + 1)
      }
    }

    iterate(this.root, 0)
    return result
  }

}
