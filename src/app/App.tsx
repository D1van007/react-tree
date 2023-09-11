import { useEffect, useState } from "react";
import Header from "../layout/Header/Header";
import { useGetTreeMutation } from "../services/api";
import TreeNode from "../components/treeNode/treeNode";

function App() {
  const [activeNode, setActiveNode] = useState(false);

  const [getTree, { data: treeRoot, isLoading: isLoadingTreeRoot }] =
    useGetTreeMutation();
  // const [createNode, { data, isLoading }] = useCreateNewNodeMutation();

  useEffect(() => {
    getTree("GUID");
    console.log(treeRoot);
  }, [getTree]);

  useEffect(() => {
    console.log(treeRoot);
  }, [treeRoot]);

  const disableOptions = (viewOption: boolean) => {
    setActiveNode(viewOption)
  }

  return (
    <>
      <Header />
      {isLoadingTreeRoot && <h2>Loading...</h2>}
      <main>
        {treeRoot && (
          <div>
            {[treeRoot].map((rootNode) => (
              <TreeNode
                key={rootNode.id}
                node={rootNode}
                activeNode={disableOptions}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default App;
