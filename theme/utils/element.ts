import { Children, ReactNode } from "react";

export function isNode(node, type) {
  if (!node.type || !node.type.$$type) {
    return false;
  }

  return node.type.$$type === type;
}

interface MatchNodesResult {
  [prop: string]: ReactNode[];
  default: ReactNode[];
}
export function matchNodes(children, types = []) {
  return Children.toArray(children).reduce((result, node) => {
    const type = types.find((type) => isNode(node, type));
    if (!type) {
      result.default.push(node);
      return result;
    }

    if (!result[type]) {
      result[type] = [];
    }

    result[type].push(node);
    return result;
  }, { default: [] } as MatchNodesResult);
}

interface MatchNodeResult {
  [prop: string]: ReactNode;
  default: ReactNode[];
}
export function matchNode(children, types = []) {
  return Children.toArray(children).reduce((result, node) => {
    const type = types.find((type) => isNode(node, type));
    if (!type) {
      result.default.push(node);
      return result;
    }

    result[type] = node;
    return result;
  }, { default: [] } as MatchNodeResult);
}