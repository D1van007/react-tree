export interface ITree {
  id: string;
  name: string;
  expanded?: boolean;
  children: ITree[];
}
export interface INewNode {
  treeName: string;
  parentNodeId: string | null;
  nodeName: string;
}
export interface INode {
  treeName: string;
  nodeId?: string | null;
  parentNodeId?: string | null;
  nodeName?: string;
  newNodeName?: string;
}

export enum modeModaleEnum {
  DELETE = "delete",
  CREATE = "create",
  RENAME = "rename",
}
