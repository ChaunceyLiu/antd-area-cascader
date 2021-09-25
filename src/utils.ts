import type { TreeNode, ValueType } from './index.d';

export function hasChildChecked(item: TreeNode, curValue: ValueType[]): boolean {
  function dfs(node: TreeNode): boolean {
    if (!node) {
      return false;
    }
    const { code, children } = node;

    if (curValue.includes(code)) {
      return true;
    }
    if (!children) {
      return false;
    }
    return children.some((child: TreeNode) => dfs(child));
  }
  return dfs(item);
}

export function hasParentChecked(item: TreeNode, value: ValueType[]): boolean {
  let tmp: TreeNode | null | undefined = item;

  while (tmp) {
    if (value.includes(tmp.code)) {
      return true;
    }
    tmp = tmp.parent;
  }
  return false;
}

// 状态提升
export function liftTreeState(item: TreeNode, curVal: ValueType[]): ValueType[] {
  const { code } = item;

  // 加入当前节点的value
  const nextValue = curVal.concat(code);
  let last = item;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // 如果父节点的所有子节点都已经 checked, 添加该节点 value，继续尝试提升
    if (last?.parent?.children!.every((child: TreeNode) => nextValue.includes(child.code))) {
      nextValue.push(last!.parent!.code);
      if(last && last.parent) last = last.parent;
    } else {
      break;
    }
  }
  // 移除最后一个满足 checked 的父节点的所有子孙节点 value
  return removeAllDescendanceValue(last, nextValue);
}

export function removeAllDescendanceValue(root: TreeNode, value: ValueType[]): ValueType[] {
  const allChildrenValue: ValueType[] = [];
  function dfs(node: TreeNode): void {
    if (node.children) {
      node.children.forEach((item) => {
        allChildrenValue.push(item.code);
        dfs(item);
      });
    }
  }
  dfs(root);
  return value.filter((val) => !allChildrenValue.includes(val));
}

// 状态下沉
export function sinkTreeState(root: TreeNode, value: ValueType[]): ValueType[] {
  const parentValues: ValueType[] = [];
  const subTreeValues: ValueType[] = [];

  function getCheckedParent(node: TreeNode | null | undefined): TreeNode | null {
    if (!node) {
      return null;
    }
    parentValues.push(node.code);
    if (value.includes(node.code)) {
      return node;
    }

    return getCheckedParent(node.parent);
  }

  const checkedParent = getCheckedParent(root);
  if (!checkedParent) {
    return value;
  }

  function dfs(node: TreeNode) {
    if (!node.children || node.code === root.code) {
      return;
    }
    node.children.forEach((item: TreeNode) => {
      if (item.code !== root.code) {
        if (parentValues.includes(item.code)) {
          dfs(item);
        } else {
          subTreeValues.push(item.code);
        }
      }
    });
  }
  dfs(checkedParent);
  // 替换 checkedParent 下子树的值
  const nextValue = removeAllDescendanceValue(checkedParent, value).filter(
    (item) => item !== checkedParent.code,
  );
  return Array.from(new Set(nextValue.concat(subTreeValues)));
}

export function reconcile(item: TreeNode, checked: boolean, value: ValueType[]): ValueType[] {
  if (checked) {
    if (hasParentChecked(item, value)) {
      return value;
    }
    return liftTreeState(item, value);
  }
  return sinkTreeState(item, value);
}


export function refreshItem(node: TreeNode){
  if(node.parent && node.children) {
    return [undefined , node.children]
  } else if(node.parent && !node.children){
    return  [node.parent, node];
  } else {
    // const children = node?.children;
    // if(children) return [undefined, undefined];
    // const subChildren = node!.children![0].children;
    // return [
    //   children,
    //   subChildren? subChildren: undefined
    // ];
    return [node?.children ? node?.children : undefined,
      node?.children ? (node?.children[0].children ? node?.children[0].children : undefined ): undefined]
  
  }
}