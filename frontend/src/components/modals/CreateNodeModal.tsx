import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputColor, { Color } from 'react-input-color';
import { useGraph } from '../../hooks/graphHook';
import { random } from 'graphology-layout';

interface ImodalProps {
  show: boolean;
  setModalState: () => void;
}

interface INodeAttributes {
  nodeColor: string;
  nodeLabel: string;
  nodeWeight: number;
}

export function CreateNodeModal({ show, setModalState }: ImodalProps) {
  const { register, handleSubmit, reset } = useForm<INodeAttributes>();
  const [nodeColor, setNodeColor] = useState<Color>();
  const { graphObject, setGraphObject } = useGraph();

  function submitNodeAttributes(values: INodeAttributes) {
    nodeColor ? (values.nodeColor = nodeColor.hex) : '#000000';
    const temporaryGraph = graphObject;
    if (temporaryGraph) {
      temporaryGraph.addNode(values.nodeLabel, {
        size: values.nodeWeight,
        weight: values.nodeWeight,
        color: values.nodeColor,
        label: values.nodeLabel,
      });
      random.assign(temporaryGraph);
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
          <h3 className="m-auto text-primary">propriedades do vértice</h3>
          <form
            onSubmit={handleSubmit(submitNodeAttributes)}
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
                  Nome do vértice
                </label>
                <input
                  {...register('nodeLabel', {
                    required: true,
                  })}
                  className="w-full border-b-2 border-inputBorder text-xs p-1"
                  type="text"
                  placeholder="Nome do vértice"
                />
              </fieldset>

              <fieldset className="w-full flex flex-col gap-3">
                <label
                  className="text-label"
                  htmlFor=""
                >
                  Peso do vértice
                </label>
                <input
                  {...register('nodeWeight', {
                    required: true,
                  })}
                  className="w-full border-b-2 border-inputBorder text-xs p-1"
                  type="text"
                  placeholder="Peso do vértice"
                />
              </fieldset>

              <fieldset className="w-full flex flex-col gap-3">
                <label
                  className="text-label"
                  htmlFor=""
                >
                  Cor do vértice
                </label>

                <InputColor
                  initialValue="#808080"
                  onChange={setNodeColor}
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
        </div>
      </div>
    </div>
  );
}
