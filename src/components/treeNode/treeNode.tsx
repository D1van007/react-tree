import { useState } from "react";
import { ITree } from "../../types/types";

interface IProps {
  node: ITree;
}

const TreeNode = ({ node }: IProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="tree-node">
      <div
        onClick={handleToggle}
        className={`node-toggle ${isExpanded ? "expanded" : ""}`}
      >
        {isExpanded && node.children.length > 0 ? "📖" : "📂"} {node.name}
      </div>
      {isExpanded && (
        <ul className="child-nodes">
          {node.children.map((childNode) => (
            <li key={childNode.id}>
              <TreeNode node={childNode} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TreeNode;
