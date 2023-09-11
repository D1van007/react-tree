import { useEffect } from "react";
import Header from "../layout/Header/Header";
import { useGetTreeMutation } from "../services/api";
import TreeNode from "../components/treeNode/treeNode";

function App() {
  const [getTree, { data: treeRoot, isLoading: isLoadingTreeRoot }] =
    useGetTreeMutation();


  useEffect(() => {
    getTree("GUID");
    console.log(treeRoot);
  }, [getTree]);

  useEffect(() => {
    console.log(treeRoot);
  }, [treeRoot]);


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
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default App;
