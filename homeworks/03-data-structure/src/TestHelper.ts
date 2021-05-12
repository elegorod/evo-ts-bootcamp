import {TreeNode} from './BinaryTreeBase'

/** Create tree node */
export function node(value: number, left?: TreeNode<number>, right?: TreeNode<number>) {
  return new TreeNode(value, left, right)
}

export function sort(array: number[]) {
  return array.sort((a, b) => a - b)
}
