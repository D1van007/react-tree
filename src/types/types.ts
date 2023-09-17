export interface ITree {
  id: string;
  name: string;
  children: ITree[];
}

export interface INode {
  treeName: string;
  nodeId?: string | null;
  parentNodeId?: string | null;
  nodeName?: string;
  newNodeName?: string | undefined;
}

export enum modeModaleEnum {
  DELETE = "delete",
  CREATE = "create",
  RENAME = "rename",
  DEFAULT = "default",
}
export interface IModeModale {
  modeModale: "delete" | "create" | "rename" | "default";
}
export type ErrorDataType = {
  error: string;
  errorObject: object;
  type: string;
  id: string;
  data: {
    message: string;
  }
};
export type CustomerError = {
  data: ErrorDataType;
  status: number;
};
