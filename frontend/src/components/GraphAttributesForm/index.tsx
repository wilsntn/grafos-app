import { useGraph } from '@/hooks/graphHook';
import { useForm } from 'react-hook-form';

interface IGeneralGraphAttributes {
  nodeWeight: number;
  edgeWeight: number;
  verticeColor: string;
  labelDistance: number;
}

export function GraphAttributesForm() {
  const { register, handleSubmit } = useForm<IGeneralGraphAttributes>();
  const { graphObject, setGraphObject } = useGraph();

  function submitGraphAttributes(values: IGeneralGraphAttributes) {
    if (graphObject) {
      graphObject.forEachNode((node) => {
        graphObject.setNodeAttribute(node, 'size', values.nodeWeight);
        graphObject.setNodeAttribute(node, 'color', values.verticeColor);
      });

      graphObject.forEachEdge((edge) => {
        graphObject.setEdgeAttribute(edge, 'weight', values.edgeWeight);
      });
    }

    //função para aplicar as novas propriedades no grafo e retornar o objeto que será setado no estado de grafo
  }

  return (
    <div className="w-full max-h-fit flex flex-col ">
      <h3 className="ml-4 text-primary">propriedades gerais</h3>
      <form className="max-w-full min-h-fit flex h-60 bg-white rounded-2xl p-5 gap-5 mt-3">
        {/* fix the height of the form container to be % or something else to be dynamically adjust its size*/}
        {/* first form to handle the general properties of the graph */}
        <fieldset
          onSubmit={handleSubmit(submitGraphAttributes)}
          className="w-2/4 flex flex-col gap-3"
        >
          <label
            className="text-label"
            htmlFor=""
          >
            DNV
          </label>
          <input
            {...register('labelDistance')}
            className="w-full border-b-2 border-inputBorder text-xs p-1"
            type="text"
            placeholder="Distância nome do vértice"
          />
          <label
            className="text-label"
            htmlFor=""
          >
            Peso aresta
          </label>
          <input
            {...register('edgeWeight')}
            className="w-full border-b-2 border-inputBorder text-xs p-1"
            type="text"
            placeholder="Peso da aresta"
          />
        </fieldset>
        <fieldset className="w-2/4 flex flex-col gap-3">
          <label
            className="text-label"
            htmlFor=""
          >
            Peso vértice
          </label>
          <input
            {...register('nodeWeight')}
            className="w-full border-b-2 border-inputBorder text-xs p-1"
            type="text"
            placeholder="Peso dos vértices"
          />
          <label
            className="text-label"
            htmlFor=""
          >
            Cor do vértice
          </label>
          <input
            {...register('verticeColor')}
            className="w-full border-b-2 border-inputBorder text-xs p-1"
            type="text"
            placeholder="Cores dos vértices"
          />
        </fieldset>
      </form>
    </div>
  );
}
