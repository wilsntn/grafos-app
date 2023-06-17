import { IGraphConverterResponse } from '@/types/types';
import Graph from 'graphology';
import { random } from 'graphology-layout';

export function graphHandler(graph: IGraphConverterResponse) {
  // função vai retornar o objeto do grafo todo feito
  let newGraph = new Graph();

  graph.nodes.forEach((element) => {
    newGraph.addNode(`${element.id}`);
  });
  graph.links.forEach((element) => {
    newGraph.addEdge(`${element.source}`, `${element.target}`);
  });
  random.assign(newGraph);
  return newGraph;
}
