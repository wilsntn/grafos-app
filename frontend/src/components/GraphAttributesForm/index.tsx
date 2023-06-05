export function GraphAttributesForm() {
  return (
    <div className="w-full max-h-fit flex flex-col ">
      <h3 className="ml-4 text-primary">propriedades gerais</h3>
      <form className="max-w-full min-h-fit flex h-60 bg-white rounded-2xl p-5 gap-5 mt-3">
        {/* fix the height of the form container to be % or something else to be dynamically adjust its size*/}
        {/* first form to handle the general properties of the graph */}
        <fieldset className="w-2/4 flex flex-col gap-3">
          <label
            className="text-[#025E7B]"
            htmlFor=""
          >
            DNV
          </label>
          <input
            className="w-full border-b-2 border-[#02394A] text-xs"
            type="text"
            placeholder="Distância nome do vértice"
          />
          <label
            className="text-[#025E7B]"
            htmlFor=""
          >
            Peso aresta
          </label>
          <input
            className="w-full border-b-2 border-[#02394A] text-xs"
            type="text"
            placeholder="Peso da aresta"
          />
        </fieldset>
        <fieldset className="w-2/4 flex flex-col gap-3">
          <label
            className="text-[#025E7B]"
            htmlFor=""
          >
            Peso vértice
          </label>
          <input
            className="w-full border-b-2 border-[#02394A] text-xs"
            type="text"
            placeholder="Peso dos vértices"
          />
          <label
            className="text-[#025E7B]"
            htmlFor=""
          >
            Cor do vértice
          </label>
          <input
            className="w-full border-b-2 border-[#02394A] text-xs"
            type="text"
            placeholder="Cores dos vértices"
          />
        </fieldset>
      </form>
    </div>
  );
}
