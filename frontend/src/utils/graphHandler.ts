import { IGraphConverterResponse } from '../types/types';

export function graphHandler(graph: IGraphConverterResponse) {
  // função vai retornar o objeto do grafo todo feito
  const newGraph = {
    nodes: graph.nodes,
    links: graph.links,
  };
  return newGraph;
}
