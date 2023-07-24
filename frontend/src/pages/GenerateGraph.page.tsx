import { useState } from 'react';
import { GraphComponent } from '../components/GraphComponent';
import { useGraph } from '../hooks/graphHook';
import { SlGraph } from 'react-icons/sl';
import { PiGraphDuotone } from 'react-icons/pi';
import { PiShareNetwork } from 'react-icons/pi';
import { BiNetworkChart } from 'react-icons/bi';
import Graph from 'graphology';
import complete from 'graphology-generators/classic/complete';
import { circlepack, random } from 'graphology-layout';
import caveman from 'graphology-generators/community/caveman';
import clusters from 'graphology-generators/random/clusters';
import florentineFamilies from 'graphology-generators/social/florentine-families';
import { BsDownload } from 'react-icons/bs';
import { GraphAttributesForm } from '../components/GraphAttributesForm';
import { GraphLayoutForm } from '../components/GraphLayoutForm';
import { CleanGraphButton } from '../components/CleanGraphButton';

export function GenerateGraph() {
  const { graphObject, setGraphObject } = useGraph();
  const [downloadGraphState, setDownloadGraphState] = useState<boolean>(false);

  //criar as funções que vão gerar os grafos modelos

  function createCompleteGraph() {
    const graph = complete(Graph, 10);
    random.assign(graph);
    setGraphObject(graph);
  }

  function createCommunityGraph() {
    const graph = caveman(Graph, 6, 8);
    circlepack.assign(graph);
    setGraphObject(graph);
  }

  function createClusteredGraph() {
    const graph = clusters(Graph, {
      order: 100,
      size: 1000,
      clusters: 5,
    });
    random.assign(graph);
    setGraphObject(graph);
  }

  function createSocialGraph() {
    const graph = florentineFamilies(Graph);
    random.assign(graph);
    setGraphObject(graph);
  }

  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/3 h-screen bg-secondary xl:max-w-[30%]">
        <div className="mt-1 m-auto flex items-center justify-center">
          <h2 className="text-white m-auto">Gerar exemplos</h2>
        </div>
        <div className="w-full grid grid-rows-2 grid-cols-2 gap-5 p-8 xl:p-10 xl:mt-10">
          <div className="w-full flex justify-center items-center">
            <button
              className="w-[70%] h-20 flex flex-col items-center justify-around bg-white rounded-xl text-primary xl:w-[45%]"
              onClick={createCompleteGraph}
            >
              <SlGraph
                size={40}
                color="gray"
              />
              tipo 1
            </button>
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              className="w-[70%] h-20 flex flex-col items-center justify-around bg-white rounded-xl text-primary xl:w-[45%]"
              onClick={createCommunityGraph}
            >
              <PiGraphDuotone
                size={40}
                color="gray"
              />
              tipo 2
            </button>
          </div>

          <div className="w-full flex justify-center items-center">
            <button
              className="w-[70%] h-20 flex flex-col items-center justify-around bg-white rounded-xl text-primary xl:w-[45%]"
              onClick={createClusteredGraph}
            >
              <PiShareNetwork
                size={40}
                color="gray"
              />{' '}
              tipo 3
            </button>
          </div>

          <div className="w-full flex justify-center items-center">
            <button
              className="w-[70%] h-20 flex flex-col items-center justify-around bg-white rounded-xl text-primary xl:w-[45%]"
              onClick={createSocialGraph}
            >
              <BiNetworkChart
                size={40}
                color="gray"
              />
              tipo 4
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col px-10 xl:p-10 xl:gap-5">
          <GraphAttributesForm />
          <GraphLayoutForm />
        </div>
      </div>
      <div className="w-4/6 h-full">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="w-3/5 h-3/5 shadow-lg shadow-gray-400 flex justify-center items-center rounded-2xl">
            {graphObject && (
              <GraphComponent
                downloadGraphState={downloadGraphState}
                setDownloadState={() =>
                  setDownloadGraphState(!downloadGraphState)
                }
                graph={graphObject}
              />
            )}
          </div>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              className="min-w-fit min-h-fit flex items-center justify-around gap-2 text-black bg-white shadow-lg shadow-gray-400 rounded-xl p-3 px-5"
              onClick={() => setDownloadGraphState(true)}
            >
              baixar grafo
              <i>
                <BsDownload color="black" />
              </i>
            </button>
            <CleanGraphButton />
          </div>
        </div>
      </div>
    </div>
  );
}
