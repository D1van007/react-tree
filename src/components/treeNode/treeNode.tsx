import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITree, modeModaleEnum } from "../../types/types";
import styles from "./treeNode.module.scss";
import { setOpenModal } from "../../store/slices/openModalReducer";
import { setModeModale } from "../../store/slices/modeModalReducer";
import {
  setNodeId,
  setNodeName,
  setParentNodeId,
} from "../../store/slices/nodeReducer";
import {
  addExpandedFolder,
  deleteExpandedFolder,
} from "../../store/slices/expandedFoldersReducer";
import { RootState } from "../../store/store";
import addIcon from "../../assets/icon/add-button.png";
import editIcon from "../../assets/icon/edit-button.png";
import deleteIcon from "../../assets/icon/delete-button.png";
import foldersIcon from "../../assets/icon/folders.png";
import openFolder from "../../assets/icon/open-folder.png";
import folderIcon from "../../assets/icon/folder.png";

interface IProps {
  node: ITree;
}

const TreeNode = ({ node }: IProps) => {
  const expandedFolderId: string[] = useSelector(
    (state) => (state as RootState).expandedFolders
  );
  const treeState = useSelector(
    (state) => (state as RootState).tree
  );

  const isExpandedNode = expandedFolderId.includes(node.id);

  const [isExpanded, setIsExpanded] = useState(isExpandedNode);
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    if (!isExpanded) {
      dispatch(addExpandedFolder(node.id));
    }
    if (isExpanded) {
      dispatch(deleteExpandedFolder(node.id));
      const recursiveTraversalNode = (node: ITree[]) => {
        node.map((child) => {
          dispatch(deleteExpandedFolder(child.id));
          child.children.length && recursiveTraversalNode(child.children);
        });
      };
      recursiveTraversalNode([node]);
    }

    setIsExpanded(!isExpanded);
  };

  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!nodeRef.current) return;
      if (!nodeRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
      if (nodeRef.current.contains(e.target as Node)) {
        setIsActive(true);
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isActive]);

  useEffect(() => {}, [node]);

  const dispatch = useDispatch();

  const handleClick = (e: SyntheticEvent, mode: string) => {
    e.stopPropagation();
    dispatch(setOpenModal(true));
    dispatch(setNodeId(node.id));
    dispatch(setNodeName(node.name));

    if (mode === modeModaleEnum.CREATE) {
      dispatch(setParentNodeId(node.id));
      dispatch(setModeModale(modeModaleEnum.CREATE));
      dispatch(setNodeName(""));
    }
    if (mode === modeModaleEnum.RENAME) {
      dispatch(setModeModale(modeModaleEnum.RENAME));
    }
    if (mode === modeModaleEnum.DELETE) {
      dispatch(setModeModale(modeModaleEnum.DELETE));
    }
  };

  return (
    <div className={styles.treeNode}>
      <div onClick={handleToggle} className={styles.nodeToggle} ref={nodeRef}>
        {isExpanded && node.children.length > 0 ? (
          <img
            className={styles.iconNode}
            src={openFolder}
            alt="icon open folder"
          />
        ) : node.children.length > 0 ? (
          <img className={styles.iconNode} src={foldersIcon} alt="icon add" />
        ) : (
          <img className={styles.iconNode} src={folderIcon} alt="icon add" />
        )}
        {node.name}
        {isActive && (
          <div className={styles.optionsContainer}>
            <div
              className={styles.optionsBtn}
              onClick={(e) => {
                handleClick(e, modeModaleEnum.CREATE);
              }}
            >
              <img className={styles.iconBtn} src={addIcon} alt="icon add" />
            </div>
            {
              (+node.id !== +treeState.tree.id && (
                <>
                  <div
                    className={styles.optionsBtn}
                    onClick={(e) => {
                      handleClick(e, modeModaleEnum.RENAME);
                    }}
                  >
                    <img
                      className={styles.iconBtn}
                      src={editIcon}
                      alt="icon edit"
                    />
                  </div>
                  <div
                    className={styles.optionsBtn}
                    onClick={(e) => {
                      handleClick(e, modeModaleEnum.DELETE);
                    }}
                  >
                    <img
                      className={styles.iconBtn}
                      src={deleteIcon}
                      alt="icon delete"
                    />
                  </div>
                </>
              ))
            }
          </div>
        )}
      </div>
      {isExpanded && (
        <ul className={styles.childNodes}>
          {node.children.map((childNode) => (
            <li key={childNode.id} className={styles.nodeContainer}>
              <TreeNode node={childNode} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TreeNode;
