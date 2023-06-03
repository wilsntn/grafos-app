export default function ImportGraph() {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/3 h-full bg-secondary ">
        {/*change padding of the above element to make it responsive  */}
        <div className="mt-1 m-auto flex items-center justify-center">
          <h2 className="text-white m-auto">Propriedades do grafo</h2>
        </div>
        <div className="w-full min-h-screen flex flex-col justify-between items-center p-10">
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
          <div className="w-full min-h-screen flex flex-col justify-between items-center">
            <div className="w-full max-h-fit flex flex-col ">
              <h3 className="text-primary">propriedades do vértice</h3>
              <form className="max-w-full min-h-fit flex  bg-white rounded-2xl p-5 gap-5 mt-3">
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
          </div>
          <div className="flex items-center justify-center">
            <button className="">teste</button>
          </div>
        </div>
      </div>
      <div className="w-4/6 h-full">oi</div>
    </div>
  );
}
