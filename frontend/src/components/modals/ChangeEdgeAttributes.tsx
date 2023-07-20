import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputColor, { Color } from 'react-input-color';
import { useGraph } from '../../hooks/graphHook';
import { AiOutlineClear } from 'react-icons/ai';

interface ImodalProps {
  show: boolean;
  setModalState: () => void;
  edge?: string;
}

interface IEdgeAttributes {
  edgeColor: string;
  edgeLabel: string;
  edgeWeight: number;
  edgeSize: number;
}

export function ChangeEdgeAttributesModal({
  show,
  setModalState,
  edge,
}: ImodalProps) {
  const { register, handleSubmit, reset } = useForm<IEdgeAttributes>();
  const [edgeColor, setEdgeColor] = useState<Color>();
  const { graphObject, setGraphObject } = useGraph();

  function submitEdgeAttributes(values: IEdgeAttributes) {
    edgeColor ? (values.edgeColor = edgeColor.hex) : '#000000';
    const temporaryGraph = graphObject;
    if (temporaryGraph) {
      temporaryGraph.setEdgeAttribute(edge, 'label', values.edgeLabel);
      temporaryGraph.setEdgeAttribute(edge, 'weight', values.edgeWeight);
      temporaryGraph.setEdgeAttribute(edge, 'size', values.edgeSize);
      temporaryGraph.setEdgeAttribute(edge, 'color', values.edgeColor);
      setModalState();
      return setGraphObject(temporaryGraph);
    }
    return;
  }

  function clearEdgeAttributes() {
    const temporaryGraph = graphObject;
    if (temporaryGraph) {
      temporaryGraph.removeEdgeAttribute(edge, 'label');
      temporaryGraph.removeEdgeAttribute(edge, 'size');
      temporaryGraph.removeEdgeAttribute(edge, 'color');
      temporaryGraph.removeEdgeAttribute(edge, 'weight');
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
      <div className="w-[35%] h-[60%] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
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
                aplicar
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
          <div className="p-3 flex">
            <button
              onClick={clearEdgeAttributes}
              type="button"
              className="w-full flex items-center gap-2 text-white bg-cancelButtonPrimary hover:bg-cancelButtonSecondary rounded-xl p-2"
            >
              Limpar atributos
              <i>
                <AiOutlineClear color="white" />
              </i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
