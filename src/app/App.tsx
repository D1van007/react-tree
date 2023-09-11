import { useEffect } from "react";
import Header from "../layout/Header/Header";
import { useGetTreeMutation } from "../services/api";
import TreeNode from "../components/treeNode/treeNode";

function App() {
  const [getTree, { data, isLoading }] = useGetTreeMutation();

  useEffect(() => {
    getTree("GUID");
  }, []);

  return (
    <>
      <Header />
      {isLoading && <h2>Loading...</h2>}
      <main>
        {data && (
          <div>
            {[data].map((rootNode) => (
              <TreeNode key={rootNode.id} node={rootNode} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default App;
