import BinaryTreeBase, { TreeNode, TraverseType } from './BinaryTreeBase'

export default class BinaryTree<T> implements BinaryTreeBase<T> {

  public constructor(protected root: TreeNode<T>) {
  }

  public getRoot(): TreeNode<T> {
    return this.root
  }

  public setRoot(root: TreeNode<T>): this {
    this.root = root
    return this
  }

  public traverse(traverseType: TraverseType): T[] {
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
            const first = queue.shift() as TreeNode<T>
            result.push(first.value)
            if (first.left) {
              queue.push(first.left)
            }
            if (first.right) {
              queue.push(first.right)
            }
          }
          break
      }
      return result
    }

    return traverseInternal(this.root, traverseType)
  }

  public getColumn(column: number): T[] {
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
