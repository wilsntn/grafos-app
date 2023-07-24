import { SlGraph } from 'react-icons/sl';
import { GraphAttributesForm } from '../components/GraphAttributesForm';
import { useGraph } from '../hooks/graphHook';
import { GraphComponent } from '../components/GraphComponent';
import { useState } from 'react';
import { BsDownload } from 'react-icons/bs';
import { CreateNodeModal } from '../components/modals/CreateNodeModal';
import { CreateEdgeModal } from '../components/modals/CreateEdgeModal';
import { LuSpline } from 'react-icons/lu';
import { CleanGraphButton } from '../components/CleanGraphButton';

export function CreateGraph() {
  const { graphObject } = useGraph();
  const [downloadGraphState, setDownloadGraphState] = useState<boolean>(false);
  const [createNodeModalState, setCreateNodeModalState] =
    useState<boolean>(false);
  const [createEdgeModalState, setCreateEdgeModalState] =
    useState<boolean>(false);
  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/3 h-screen bg-secondary xl:max-w-[30%]">
        <div className="mt-1 m-auto flex items-center justify-center">
          <h2 className="text-white m-auto">Criar grafo</h2>
        </div>
        <div className="w-full grid grid-rows-1 grid-cols-2 gap-5 p-8 xl:p-10 xl:mt-10">
          <div className="w-full flex justify-center items-center">
            <button
              className="w-[70%] h-20 flex flex-col items-center justify-around bg-white rounded-xl text-primary xl:w-[45%]"
              onClick={() => setCreateNodeModalState(true)}
            >
              <SlGraph
                size={40}
                color="gray"
              />
              criar vértice
            </button>
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              className="w-[70%] h-20 flex flex-col items-center justify-around bg-white rounded-xl text-primary xl:w-[45%]"
              onClick={() => setCreateEdgeModalState(true)}
            >
              <LuSpline
                size={40}
                color="gray"
              />
              criar aresta
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col px-10 xl:p-10 xl:gap-5">
          <GraphAttributesForm />
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
      <CreateNodeModal
        show={createNodeModalState}
        setModalState={() => setCreateNodeModalState(!createNodeModalState)}
      />
      <CreateEdgeModal
        show={createEdgeModalState}
        setModalState={() => setCreateEdgeModalState(!createEdgeModalState)}
      />
    </div>
  );
}
