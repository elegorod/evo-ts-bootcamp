export class TreeNode<T> {
  readonly value: T
  readonly left?: TreeNode<T>
  readonly right?: TreeNode<T>

  constructor(value: T, left?: TreeNode<T>, right?: TreeNode<T>) {
    this.value = value
    this.left = left
    this.right = right
  }
}

export default interface BinaryTreeBase<T> {
  getRoot(): TreeNode<T>
  setRoot(node: TreeNode<T>): this
  traverse(traverseType: TraverseType): T[]
  getColumn(column: number): T[]
}

export interface BinarySearchTreeBase extends BinaryTreeBase<number> {
  has(value: number): boolean
}

export enum TraverseType {
  PreOrder = "PreOrder",
  InOrder = "InOrder",
  PostOrder = "PostOrder",
  Breadth = "Breadth"
}
