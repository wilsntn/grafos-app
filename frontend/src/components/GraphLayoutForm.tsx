import { useGraph } from '../hooks/graphHook';
import { GiHolosphere } from 'react-icons/gi';
import { TbArrowsRandom } from 'react-icons/tb';
import { random, circular } from 'graphology-layout';

export function GraphLayoutForm() {
  const { graphObject, setGraphObject } = useGraph();

  function applyRandomLayout() {
    const tempGraph = graphObject;
    if (tempGraph) {
      random.assign(tempGraph);
      return setGraphObject(tempGraph);
    }

    return;
  }

  function applyCircularLayout() {
    const tempGraph = graphObject;
    if (tempGraph) {
      circular.assign(tempGraph);
      return setGraphObject(tempGraph);
    }

    return;
  }
  return (
    <section className="w-full min-h-fit flex flex-col ">
      <h3 className="m-auto text-primary">Layouts do grafo</h3>
      <div className="m-auto max-w-full min-h-fit flex flex-col bg-white rounded-2xl p-3 gap-5 mt-3 xl:max-w-[80%] ">
        {/* fix the height of the form container to be % or something else to be dynamically adjust its size*/}
        {/* first form to handle the general properties of the graph */}
        <div className="w-[90%] h-[90%] m-auto border-none flex justify-around items-center gap-2">
          <div className="w-full flex">
            <button
              onClick={applyCircularLayout}
              className="bg-secondary hover:bg-submitButtonSecondary text-white font-bold py-2 px-4 flex min-w-fit items-center justify-between gap-1 rounded"
            >
              circular
              <i>
                <GiHolosphere />
              </i>
            </button>
          </div>

          <div className="w-full flex">
            <button
              onClick={applyRandomLayout}
              className="bg-secondary hover:bg-submitButtonSecondary text-white font-bold py-2 px-4 flex min-w-fit items-center justify-between gap-1 rounded"
            >
              randômico
              <i>
                <TbArrowsRandom />
              </i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
