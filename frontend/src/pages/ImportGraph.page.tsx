import { GraphComponent } from '../components/GraphComponent';
import { GraphAttributesForm } from '../components/GraphAttributesForm';
import { UploadIcon } from '../components/Assets/UploadIcon';
import Graph from 'graphology';
import { ChangeEvent, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { random } from 'graphology-layout';
import { useGraph } from '../hooks/graphHook';
import { graphConverter } from '../utils/api';
import { BsDownload } from 'react-icons/bs';
import { GraphLayoutForm } from '../components/GraphLayoutForm';

export function ImportGraph() {
  const { graphObject, setGraphObject } = useGraph();
  const [fileGraph, setFileGraph] = useState<File>();
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  // const [sigma, setSigma] = useState<Sigma | null>(null);
  const [downloadGraphState, setDownloadGraphState] = useState<boolean>(false);

  const { mutate } = useMutation(
    (fileGraph: FormData) => graphConverter(fileGraph),
    {
      onSuccess(graph: Graph) {
        const newGraph = Graph.from(graph);
        random.assign(newGraph);
        setGraphObject(newGraph);
      },
      onError(error) {
        console.log(error);
      },
    }
  );

  function handleFileGraphUpload() {
    hiddenFileInput.current?.click();
  }
  function handleFileGraphChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    setFileGraph(event.target.files[0]);
    const data = new FormData();
    data.append('file', event.target.files[0]);
    mutate(data);
  }

  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/3 h-full bg-secondary xl:max-w-[30%]">
        {/*change padding of the above element to make it responsive  */}
        <div className="mt-1 m-auto flex items-center justify-center">
          <h2 className="text-white m-auto">Propriedades do grafo</h2>
        </div>
        <div className="w-full min-h-screen flex flex-col justify-around items-center p-10">
          <GraphAttributesForm />
          <GraphLayoutForm />
          {/* <GraphAttributesForm /> */}
          <div
            onClick={handleFileGraphUpload}
            className="w-full h-16 flex items-center justify-around"
          >
            <button className="w-2/4  h-3/4 bg-white rounded-2xl flex items-center justify-around p-1 xl:w-1/3 shadow-lg shadow-gray-400">
              importar grafo
              <UploadIcon classAtributtes="w-2/6 h-3/4" />
            </button>
            <input
              className="hidden"
              name="file"
              type="file"
              ref={hiddenFileInput}
              onChange={handleFileGraphChange}
            />
          </div>
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
          <div className="mt-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}
