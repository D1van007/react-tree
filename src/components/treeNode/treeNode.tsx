import { useEffect, useRef, useState } from "react";
import { ITree } from "../../types/types";
import styles from "./treeNode.module.scss";

interface IProps {
  node: ITree;
  activeNode: (view: boolean) => void;
}

const TreeNode = ({ node, activeNode }: IProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActive, setIsActive] = useState(false);

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

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="tree-node">
      <div
        onClick={handleToggle}
        className={`node-toggle ${isExpanded ? "expanded" : ""}`}
        ref={nodeRef}
      >
        {isExpanded && node.children.length > 0 ? "📖" : "📂"} {node.name}
        {isActive && (
          <div className={styles.optionsContainer}>
            <button>Create</button>
            <button>Rename</button>
            <button>Delete</button>
          </div>
        )}
      </div>
      {isExpanded && (
        <ul className="child-nodes">
          {node.children.map((childNode) => (
            <li key={childNode.id} className={styles.nodeContainer}>
              <TreeNode node={childNode} activeNode={activeNode} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TreeNode;
