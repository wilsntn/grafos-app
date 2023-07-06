// import { GraphComponent } from '@/components/Graph';
// import { GraphAttributesForm } from '@/components/GraphAttributesForm';
// import { UploadIcon } from '@/components/UploadIcon';
// import { IGraphConverterResponse } from '@/types/types';
// import { graphConverter } from '@/utils/api';
// import { graphHandler } from '@/utils/graphHandler';
// import Graph, { MultiDirectedGraph } from 'graphology';
import { useMutation } from 'react-query';
import { ChangeEvent, useRef, useState } from 'react';
import { graphConverter } from '../utils/api';
import { UploadIcon } from '../components/Assets/UploadIcon';
import { GraphAttributesForm } from '../components/GraphAttributesForm';
import { GraphComponent } from '../components/GraphComponent';

interface IGraphFile {
  graph: File;
}

interface ITemporaryGraph {
  nodes: {
    id: string;
  }[];
  edges: {
    source: string;
    target: string;
  }[];
}

export function ImportGraph() {
  //setar o meu react-hook-form para ler um arquivo
  //setar meu react-query para fazer a chamada na api e retornar o grafo
  //passar o valor do meu estado grafo para o componentes responsável por renderizar ele
  //passar meu setGraph para dentro do meu formulário, bem como os métodos necessário do react-hook-form como props
  const [graph, setGraph] = useState<any>();
  const [fileGraph, setFileGraph] = useState<File>();
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const { mutate } = useMutation(
    (fileGraph: FormData) => graphConverter(fileGraph),
    {
      onSuccess(graph: any) {
        setGraph(graph);
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
      <div className="w-1/3 h-full bg-secondary ">
        {/*change padding of the above element to make it responsive  */}
        <div className="mt-1 m-auto flex items-center justify-center">
          <h2 className="text-white m-auto">Propriedades do grafo</h2>
        </div>
        <div className="w-full min-h-screen flex flex-col justify-around items-center p-10">
          <GraphAttributesForm />
          <GraphAttributesForm />
          <div
            onClick={handleFileGraphUpload}
            className="w-full h-16 flex items-center justify-around"
          >
            <button className="w-1/4  h-3/4 bg-white rounded-2xl flex items-center justify-around p-1">
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
          <div className="w-3/5 h-3/5 shadow-lg shadow-gray-400 rounded-3xl flex justify-center items-center">
            {graph && <GraphComponent graph={graph} />}
          </div>
          <div>teste</div>
        </div>
      </div>
    </div>
  );
}
