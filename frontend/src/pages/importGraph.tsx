import { GraphAttributesForm } from '@/components/GraphAttributesForm';
import { UploadIcon } from '@/components/UploadIcon';

export default function ImportGraph() {
  function applyData() {}
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
          <div className="w-full h-16 flex items-center justify-around">
            <button className="min-w-fit h-3/4 bg-white rounded-2xl flex items-center justify-around p-1">
              Grafo json
              <UploadIcon classAtributtes="w-2/6 h-3/4" />
            </button>
            <button className="min-w-fit h-3/4 bg-white rounded-2xl flex items-center justify-around p-1">
              Grafo txt <UploadIcon classAtributtes="w-2/6 h-3/4" />
            </button>
          </div>
        </div>
      </div>
      <div className="w-4/6 h-full">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="w-3/5 h-3/5 shadow-lg shadow-gray-400 rounded-3xl">
            {/* div where i will place the graph renderized */}
          </div>
          <div>teste</div>
        </div>
      </div>
    </div>
  );
}
