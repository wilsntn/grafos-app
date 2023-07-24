import { PiBroom } from 'react-icons/pi';
import { useGraph } from '../hooks/graphHook';

export function CleanGraphButton() {
  const { graphObject, setGraphObject } = useGraph();
  function cleanGraph() {
    const tempGraph = graphObject;
    if (tempGraph) {
      tempGraph.clear();
      return setGraphObject(tempGraph);
    }
    return;
  }
  return (
    <button
      type="button"
      className="min-w-fit min-h-fit flex items-center justify-around gap-2 text-black bg-white shadow-lg shadow-gray-400 rounded-xl p-3 px-5"
      onClick={cleanGraph}
    >
      limpar grafo
      <i>
        <PiBroom color="black" />
      </i>
    </button>
  );
}
