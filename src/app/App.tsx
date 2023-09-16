import { useEffect, useRef, useState } from "react";
import {
  useCreateNodeMutation,
  useDeleteNodeMutation,
  useGetTreeMutation,
  useRenameNodeMutation,
} from "../services/api";
import TreeNode from "../components/treeNode/treeNode";
import { treeName } from "../constants/names";
import { CustomerError, INode, modeModaleEnum } from "../types/types";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setOpenModal } from "../store/slices/openModalReducer";
import LinearProgress from "@mui/material/LinearProgress";
import { ModalChildren } from "../components/ui/modalChildren/modalChildren";
import { setNewNodeName, setNodeName } from "../store/slices/nodeReducer";
import styles from "./App.module.scss";

function App() {
  const dispatch = useDispatch();

  const [
    getTree,
    { data: treeRoot, isLoading: isLoadingTreeRoot, isError, error },
  ] = useGetTreeMutation();

  const [
    createNode,
    {
      isLoading: isLoadingCreateNode,
      isError: isErrorCreateNode,
      error: errorCreateNode,
    },
  ] = useCreateNodeMutation();

  const [
    deleteNode,
    {
      isLoading: isLoadingDeleteNode,
      isError: isErrorDeleteNode,
      error: errorDeleteNode,
    },
  ] = useDeleteNodeMutation();

  const [
    renameNode,
    {
      isLoading: isLoadingRenameNode,
      isError: isErrorRenameNode,
      error: errorRenameNode,
    },
  ] = useRenameNodeMutation();

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getTree(treeName);

    const onClick = (e: MouseEvent) => {
      if (!mainRef.current) return;
      if (!mainRef.current.contains(e.target as Node))
        e.stopImmediatePropagation();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [getTree]);

  const parentNodeId = useSelector(
    (state) => (state as RootState).node.parentNodeId
  );

  const nodeNameState = useSelector(
    (state) => (state as RootState).node.nodeName
  );

  const newNodeNameState = useSelector(
    (state) => (state as RootState).node.newNodeName
  );

  const modeModale = useSelector(
    (state) => (state as RootState).modeModal.modeModale
  );

  const isOpenModal: boolean = useSelector(
    (state) => (state as RootState).openModal.isOpenModal
  );

  const mode: string = useSelector(
    (state) => (state as RootState).modeModal.modeModale
  );

  const nodeIdState = useSelector((state) => (state as RootState).node.nodeId);

  const [isModalError, setIsModalError] = useState(false);

  const currentNode: INode = {
    treeName: treeName,
    parentNodeId: parentNodeId,
    nodeId: nodeIdState,
    nodeName: nodeNameState,
    newNodeName: newNodeNameState,
  };

  const modalCallback = () => {
    if (modeModale === modeModaleEnum.CREATE) {
      createNode(currentNode)
        .unwrap()
        .then(() => getTree(treeName))
        .catch((e) => {
          console.log(e);
        });
    }
    if (modeModale === modeModaleEnum.DELETE) {
      deleteNode(currentNode)
        .unwrap()
        .then(() => getTree(treeName))
        .catch((e) => {
          console.log(e);
        });
    }
    if (modeModale === modeModaleEnum.RENAME) {
      renameNode(currentNode)
        .unwrap()
        .then(() => getTree(treeName))
        .catch((e) => {
          console.log(e);
        });
    }
    onCloseModal();
  };

  const onCloseModal = () => {
    dispatch(setOpenModal(false));
    dispatch(setNodeName(""));
    dispatch(setNewNodeName(undefined));
  };

  useEffect(() => {
    if (
      isError ||
      isErrorCreateNode ||
      isErrorDeleteNode ||
      isErrorRenameNode
    ) {
      setIsModalError(true);
    }
  }, [isError, isErrorCreateNode, isErrorDeleteNode, isErrorRenameNode]);

  return (
    <main ref={mainRef}>
      {(isLoadingTreeRoot ||
        isLoadingCreateNode ||
        isLoadingDeleteNode ||
        isLoadingRenameNode) && <LinearProgress className={styles.linear} />}
        
      {treeRoot && (
        <div>
          {[treeRoot].map((rootNode) => (
            <TreeNode key={rootNode.id} node={rootNode} />
          ))}
        </div>
      )}
      {
        <Modal
          open={isOpenModal}
          onClose={onCloseModal}
          classNames={{
            overlay: `${styles.customOverlay}`,
            modal: `${styles.customModal}`,
          }}
          center
        >
          <ModalChildren
            callback={modalCallback}
            mode={modeModale}
            closeModal={() => onCloseModal}
          />
        </Modal>
      }
      {
        <Modal
          open={isModalError}
          onClose={() => setIsModalError(false)}
          classNames={{
            overlay: `${styles.customOverlay}`,
            modal: `${styles.customModalError}`,
          }}
          center
        >
          <h2>Error!</h2>

          {error && (
            <p>
              {(error as CustomerError).data.data.message} Please try again.
            </p>
          )}
          {mode === modeModaleEnum.CREATE && errorCreateNode && (
            <p>{(errorCreateNode as CustomerError).data.data.message}</p>
          )}
          {mode === modeModaleEnum.DELETE && errorDeleteNode && (
            <p>{(errorDeleteNode as CustomerError).data.data.message}</p>
          )}
          {mode === modeModaleEnum.RENAME && errorRenameNode && (
            <p>{(errorRenameNode as CustomerError).data.data.message}</p>
          )}
        </Modal>
      }
    </main>
  );
}

export default App;
