/* eslint-disable react-hooks/exhaustive-deps */
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
import { setNewNodeName, setNodeName } from "../store/slices/nodeReducer";
import styles from "./App.module.scss";
import { setTree } from "../store/slices/treeReducer";
import { ModalModify } from "../components/modalModify/ModalModify";
import { ModalError } from "../components/modalError/ModalError";

function App() {
  const [isModalError, setIsModalError] = useState(false);
  const dispatch = useDispatch();

  const [getTree, { data: treeRoot, isLoading: isLoadingTreeRoot, error }] =
    useGetTreeMutation();

  const [
    createNode,
    { isLoading: isLoadingCreateNode, error: errorCreateNode },
  ] = useCreateNodeMutation();

  const [
    deleteNode,
    { isLoading: isLoadingDeleteNode, error: errorDeleteNode },
  ] = useDeleteNodeMutation();

  const [
    renameNode,
    { isLoading: isLoadingRenameNode, error: errorRenameNode },
  ] = useRenameNodeMutation();

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getTree(treeName)
      .unwrap()
      .then((data) => dispatch(setTree(data)))
      .catch((e) => {
        console.log(e);
        setIsModalError(true);
      });

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

  const isOpenModal: boolean = useSelector(
    (state) => (state as RootState).openModal.isOpenModal
  );

  const mode: "delete" | "create" | "rename" | "default" = useSelector(
    (state) => (state as RootState).modeModal.modeModale
  );

  const nodeIdState = useSelector((state) => (state as RootState).node.nodeId);

  const currentNode: INode = {
    treeName: treeName,
    parentNodeId: parentNodeId,
    nodeId: nodeIdState,
    nodeName: nodeNameState,
    newNodeName: newNodeNameState,
  };

  const modalCallback = () => {
    if (mode === modeModaleEnum.CREATE) {
      createNode(currentNode)
        .unwrap()
        .then(() => getTree(treeName))
        .catch((e) => {
          setIsModalError(true);
          console.log(e);
        });
    }
    if (mode === modeModaleEnum.DELETE) {
      deleteNode(currentNode)
        .unwrap()
        .then(() => getTree(treeName))
        .catch((e) => {
          setIsModalError(true);
          console.log(e);
        });
    }
    if (mode === modeModaleEnum.RENAME) {
      renameNode(currentNode)
        .unwrap()
        .then(() => getTree(treeName))
        .catch((e) => {
          setIsModalError(true);
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
          <ModalModify
            callback={modalCallback}
            mode={mode}
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
          <ModalError
            mode={mode}
            error={error as CustomerError}
            errorCreateNode={errorCreateNode as CustomerError}
            errorDeleteNode={errorDeleteNode as CustomerError}
            errorRenameNode={errorRenameNode as CustomerError}
          />
        </Modal>
      }
    </main>
  );
}

export default App;
