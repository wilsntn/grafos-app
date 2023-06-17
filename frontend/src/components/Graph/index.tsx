'use client';

import dynamic from 'next/dynamic';
import Graph, { MultiDirectedGraph } from 'graphology';
import { random } from 'graphology-layout';

const SigmaContainer = dynamic(
  import('@react-sigma/core').then((mod) => mod.SigmaContainer),
  { ssr: false }
);
const ControlsContainer = dynamic(
  import('@react-sigma/core').then((mod) => mod.ControlsContainer),
  { ssr: false }
);
const FullScreenControl = dynamic(
  import('@react-sigma/core').then((mod) => mod.FullScreenControl),
  { ssr: false }
);
const SearchControl = dynamic(
  import('@react-sigma/core').then((mod) => mod.SearchControl),
  { ssr: false }
);

const ZoomControl = dynamic(
  import('@react-sigma/core').then((mod) => mod.ZoomControl),
  { ssr: false }
);

interface IGraphProps {
  graph: any;
  setGraph: () => void;
}

export function GraphComponent(props: IGraphProps) {
  const newGraph = Graph.from(props.graph);
  random.assign(newGraph);
  newGraph.forEachNode((node) => {
    newGraph.setNodeAttribute(node, 'size', 10);
    newGraph.setNodeAttribute(node, 'color', 'red');
  });
  // console.log(newGraph);
  return (
    <SigmaContainer
      style={{ height: '100%', width: '100%' }}
      graph={newGraph}
    />
  );
}
