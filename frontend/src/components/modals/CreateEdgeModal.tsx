import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputColor, { Color } from 'react-input-color';
import { useGraph } from '../../hooks/graphHook';

interface ImodalProps {
  show: boolean;
  setModalState: () => void;
}

interface IEdgeAttributes {
  edgeColor: string;
  edgeLabel: string;
  edgeWeight: number;
  edgeSize: number;
  node1: string;
  node2: string;
}

export function CreateEdgeModal({ show, setModalState }: ImodalProps) {
  const { register, handleSubmit, reset } = useForm<IEdgeAttributes>();
  const [edgeColor, setEdgeColor] = useState<Color>();
  const { graphObject, setGraphObject } = useGraph();

  function submitEdgeAttributes(values: IEdgeAttributes) {
    edgeColor ? (values.edgeColor = edgeColor.hex) : '#000000';
    const temporaryGraph = graphObject;
    if (temporaryGraph) {
      //adicionar uma verificação se o valor de ambos os nodes são iguais
      temporaryGraph.addEdge(values.node1, values.node2, {
        label: values.edgeLabel,
        weight: values.edgeWeight,
        size: values.edgeSize,
        color: values.edgeColor,
      });
      setModalState();
      return setGraphObject(temporaryGraph);
    }
    return;
  }

  return (
    <div
      className={`z-auto fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-30  ${
        show === true ? 'block' : 'hidden'
      }`}
    >
      <div className="w-[35%] h-[60%] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 lg:h-[80%] xl:h-[60%]">
        <div className="flex flex-col justify-center items-center">
          <h3 className="m-auto text-primary">propriedades da aresta</h3>
          <form
            onSubmit={handleSubmit(submitEdgeAttributes)}
            className="m-auto max-w-full min-h-fit flex flex-col bg-white rounded-2xl p-5 gap-5 mt-3 xl:max-w-[80%] "
          >
            {/* fix the height of the form container to be % or something else to be dynamically adjust its size*/}
            {/* first form to handle the general properties of the graph */}
            <fieldset className="w-[90%] h-[90%] m-auto border-none flex flex-col gap-3">
              <fieldset className="w-full flex flex-col gap-3">
                <label
                  className="text-label"
                  htmlFor=""
                >
                  Nome da aresta
                </label>
                <input
                  {...register('edgeLabel')}
                  className="w-full border-b-2 border-inputBorder text-xs p-1"
                  type="text"
                  placeholder="Nome da aresta"
                />
              </fieldset>

              <fieldset className="w-full flex flex-col gap-3">
                <label
                  className="text-label"
                  htmlFor=""
                >
                  Peso da aresta
                </label>
                <input
                  {...register('edgeWeight')}
                  className="w-full border-b-2 border-inputBorder text-xs p-1"
                  type="text"
                  placeholder="Peso da aresta"
                />
              </fieldset>

              <fieldset>
                <label
                  className="text-label"
                  htmlFor=""
                >
                  Tamanho da aresta
                </label>
                <input
                  {...register('edgeSize')}
                  className="w-full border-b-2 border-inputBorder text-xs p-1"
                  type="text"
                  placeholder="tamanho da aresta"
                />
              </fieldset>

              <fieldset className="w-full flex flex-col gap-3">
                <label
                  className="text-label"
                  htmlFor=""
                >
                  Vértice 1
                </label>
                <select
                  id="node1"
                  {...register('node1')}
                >
                  {graphObject &&
                    graphObject.mapNodes((node) => {
                      return (
                        <>
                          <option
                            key={node}
                            value={node}
                          >
                            {node}
                          </option>
                        </>
                      );
                    })}
                </select>
              </fieldset>

              <fieldset className="w-full flex flex-col gap-3">
                <label
                  className="text-label"
                  htmlFor=""
                >
                  Vértice 2
                </label>

                <select
                  id="node2"
                  {...register('node2')}
                >
                  {graphObject &&
                    graphObject.mapNodes((node) => {
                      return (
                        <>
                          <option
                            key={node}
                            value={node}
                          >
                            {node}
                          </option>
                        </>
                      );
                    })}
                </select>
              </fieldset>

              <fieldset className="w-full flex flex-col gap-3">
                <label
                  className="text-label"
                  htmlFor=""
                >
                  Cor da aresta
                </label>

                <InputColor
                  initialValue="#ffffff"
                  onChange={setEdgeColor}
                ></InputColor>
              </fieldset>
            </fieldset>
            <fieldset className="w-full flex gap-3 items-center justify-between">
              <button
                type="submit"
                className="bg-submitButtonPrimary hover:bg-submitButtonSecondary text-white font-bold py-2 px-4  rounded"
              >
                adicionar
              </button>
              <button
                className="bg-cancelButtonPrimary hover:bg-cancelButtonSecondary text-white font-bold py-2 px-4  rounded"
                type="button"
                onClick={() => {
                  reset();
                  setModalState();
                }}
              >
                cancelar
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}
