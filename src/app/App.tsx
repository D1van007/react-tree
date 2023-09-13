import { useEffect } from "react";
import {
  useCreateNodeMutation,
  useDeleteNodeMutation,
  useGetTreeMutation,
  useRenameNodeMutation,
} from "../services/api";
import TreeNode from "../components/treeNode/treeNode";
import { treeName } from "../constants/names";
import { INode, modeModaleEnum } from "../types/types";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setOpenModal } from "../store/slices/openModalReducer";
import LinearProgress from "@mui/material/LinearProgress";
import { setTreeRoot } from "../store/slices/treeRootReducer";
import { ModalChildren } from "../components/ui/modalChildren/modalChildren";
import { setNewNodeName, setNodeName } from "../store/slices/nodeReducer";

function App() {
  
  const [getTree, { data: treeRoot, isLoading: isLoadingTreeRoot }] =
    useGetTreeMutation();

  const [createNode, { isLoading: isLoadingCreateNode }] =
    useCreateNodeMutation();

  const [deleteNode, { isLoading: isLoadingDeleteNode }] =
    useDeleteNodeMutation();

  const [renameNode, { isLoading: isLoadingRenameNode }] =
    useRenameNodeMutation();

  const dispatch = useDispatch();

  const treeRootState = useSelector(
    (state) => (state as RootState).treeRoot.treeRoot,
    shallowEqual
  );

  const parentNodeId = useSelector(
    (state) => (state as RootState).node.parentNodeId
  );

  const nodeNameState = useSelector(
    (state) => (state as RootState).node.nodeName
  );

  const newNodeNameState = useSelector(
    (state) => (state as RootState).node.newNodeName
  );
  const nodeIdState = useSelector((state) => (state as RootState).node.nodeId);

  const currentNode: INode = {
    treeName: treeName,
    parentNodeId: parentNodeId,
    nodeId: nodeIdState,
    nodeName: nodeNameState,
    newNodeName: newNodeNameState,
  };

  dispatch(setTreeRoot(treeRoot));

  useEffect(() => {
    getTree(treeName)
      .unwrap()
      .then((data) => {
        dispatch(setTreeRoot(data));
      })
      .then(() => {});

    // getTree(treeName);
  }, []);

  const modalCallback = () => {
    if (modeModale === modeModaleEnum.CREATE) {
      createNode(currentNode)
        .unwrap()
        .then(() => getTree(treeName));
    }
    if (modeModale === modeModaleEnum.DELETE) {
      deleteNode(currentNode)
        .unwrap()
        .then(() => getTree(treeName));
    }
    if (modeModale === modeModaleEnum.RENAME) {
      renameNode(currentNode)
        .unwrap()
        .then(() => getTree(treeName));
    }
    onCloseModal();
  };

  const isOpen: boolean = useSelector(
    (state) => (state as RootState).openModal.isOpenModal
  );

  const onCloseModal = () => {
    dispatch(setOpenModal(false));
    dispatch(setNodeName(""));
    dispatch(setNewNodeName(""))
  };

  const modeModale = useSelector(
    (state) => (state as RootState).modeModal.modeModale
  );

  if (
    isLoadingTreeRoot ||
    isLoadingCreateNode ||
    isLoadingDeleteNode ||
    isLoadingRenameNode
  ) {
    return <LinearProgress />;
  }

  return (
    <main>
      {isOpen && (
        <div>
          <Modal open={isOpen} onClose={onCloseModal} center>
            <ModalChildren
              callback={modalCallback}
              mode={modeModale}
              closeModal={onCloseModal}
            />
          </Modal>
        </div>
      )}
      {treeRootState && (
        <div>
          {[treeRootState].map((rootNode) => (
            <TreeNode key={rootNode.id} node={rootNode} />
          ))}
        </div>
      )}
      {/* {treeRoot && (
        <div>
          {[treeRoot].map((rootNode) => (
            <TreeNode key={rootNode.id} node={rootNode} />
          ))}
        </div>
      )} */}
    </main>
  );
}

export default App;
