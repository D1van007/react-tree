import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ITree, modeModaleEnum } from "../../types/types";
import styles from "./treeNode.module.scss";
import { setOpenModal } from "../../store/slices/openModalReducer";
import { setModeModale } from "../../store/slices/modeModalReducer";
import {
  setNodeId,
  setNodeName,
  setParentNodeId,
} from "../../store/slices/nodeReducer";

interface IProps {
  node: ITree;
}

const TreeNode = ({ node }: IProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
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


  const dispatch = useDispatch();

  const handleClick = (mode: string) => {
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
    <div className="tree-node">
      <div
        onClick={handleToggle}
        className={`node-toggle ${isExpanded ? "expanded" : ""}`}
        ref={nodeRef}
      >
        {isExpanded && node.children.length > 0
          ? "📖"
          : node.children.length > 0
          ? "📚"
          : "📕"}
        {node.name}
        {isActive && (
          <div
            className={styles.optionsContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                handleClick(modeModaleEnum.CREATE);
              }}
            >
              Create
            </button>
            <button
              onClick={() => {
                handleClick(modeModaleEnum.RENAME);
              }}
            >
              Rename
            </button>
            <button
              onClick={() => {
                handleClick(modeModaleEnum.DELETE);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      {isExpanded && (
        <ul className="child-nodes">
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
