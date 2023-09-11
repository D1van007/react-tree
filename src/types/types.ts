export interface ITree {
    id: string;
    name: string;
    children: ITree[];
  }
export interface INewNode{
    treeName: string;
    parentNodeId: string;
    nodeName: string;
  }