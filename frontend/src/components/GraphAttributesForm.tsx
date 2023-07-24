import { useGraph } from '../hooks/graphHook';
import { useForm } from 'react-hook-form';
import InputColor, { Color } from 'react-input-color';
import { useState } from 'react';

interface IGeneralGraphAttributes {
  nodeWeight: number;
  edgeWeight: number;
  verticeColor: string;
  edgesColor: string;
}

export function GraphAttributesForm() {
  //função para aplicar as novas propriedades no grafo e retornar o objeto que será setado no estado de grafo
  const { register, handleSubmit } = useForm<IGeneralGraphAttributes>();
  const { graphObject, setGraphObject } = useGraph();
  const [nodeColorPicker, setNodeColorPicker] = useState<Color>();
  const [edgeColorPicker, setEdgeColorPicker] = useState<Color>();

  function submitGraphAttributes(values: IGeneralGraphAttributes) {
    const temporaryGraph = graphObject;
    if (edgeColorPicker && nodeColorPicker) {
      values.edgesColor = edgeColorPicker.hex;
      values.verticeColor = nodeColorPicker.hex;
    }
    if (temporaryGraph) {
      temporaryGraph.forEachNode((node) => {
        temporaryGraph.setNodeAttribute(node, 'size', values.nodeWeight);
        temporaryGraph.setNodeAttribute(node, 'color', values.verticeColor);
      });

      temporaryGraph.forEachEdge((edge) => {
        temporaryGraph.setEdgeAttribute(edge, 'weight', values.edgeWeight);
        temporaryGraph.setEdgeAttribute(edge, 'size', values.edgeWeight);
        temporaryGraph.setEdgeAttribute(edge, 'color', values.edgesColor);
      });
      console.log(temporaryGraph);
      return setGraphObject(temporaryGraph);
    }

    return;
  }

  return (
    <div className="w-full min-h-fit flex flex-col ">
      <h3 className="m-auto text-primary">propriedades gerais</h3>
      <form
        onSubmit={handleSubmit(submitGraphAttributes)}
        className="m-auto max-w-full min-h-fit flex flex-col bg-white rounded-2xl p-5 gap-5 mt-3 xl:max-w-[80%] "
      >
        {/* fix the height of the form container to be % or something else to be dynamically adjust its size*/}
        {/* first form to handle the general properties of the graph */}
        <fieldset className="w-[90%] h-[90%] m-auto border-none grid grid-rows-2 grid-cols-2 gap-3">
          <fieldset className="w-full flex flex-col gap-3">
            <label
              className="text-label"
              htmlFor=""
            >
              Peso dos vértices
            </label>
            <input
              {...register('nodeWeight')}
              className="w-full border-b-2 border-inputBorder text-xs p-1"
              type="text"
              placeholder="Distância nome do vértice"
            />
          </fieldset>

          <fieldset className="w-full flex flex-col gap-3">
            <label
              className="text-label"
              htmlFor=""
            >
              Peso das arestas
            </label>
            <input
              {...register('edgeWeight')}
              className="w-full border-b-2 border-inputBorder text-xs p-1"
              type="text"
              placeholder="Peso da aresta"
            />
          </fieldset>

          <fieldset className="w-full flex flex-col gap-3">
            <label
              className="text-label"
              htmlFor=""
            >
              Cor dos vértices
            </label>

            <InputColor
              initialValue="#808080"
              onChange={setNodeColorPicker}
            ></InputColor>
          </fieldset>

          <fieldset className="w-full flex flex-col gap-3">
            <label
              className="text-label"
              htmlFor=""
            >
              Cor das arestas
            </label>
            <InputColor
              initialValue="#808080"
              onChange={setEdgeColorPicker}
            ></InputColor>
          </fieldset>
        </fieldset>
        <fieldset className="w-full flex gap-3 items-center justify-start">
          <button
            type="submit"
            className="bg-applyButtonPrimary hover:bg-applyButtonSecondary text-white font-bold py-2 px-4 border border-blue-700 rounded ml-3"
          >
            aplicar
          </button>
        </fieldset>
      </form>
    </div>
  );
}
