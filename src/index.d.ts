export type addressType = string | number;

export interface TreeNodeSim {
  parent?: TreeNodeSim | null;
  children?: TreeNodeSim[];
  code: string;
  name: string;
}

export interface TreeNode extends TreeNodeSim {
  parent?: TreeNode | null;
  children?: TreeNode[];
  province: addressType;
  city: addressType;
  area: addressType;
  town: addressType;
};


export type ValueType = string;

export type TreeType = TreeNode | undefined
