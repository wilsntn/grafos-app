import { MultiDirectedGraph } from 'graphology';
import { SigmaContainer } from '@react-sigma/core';
import '@react-sigma/core/lib/react-sigma.min.css';
import { random } from 'graphology-layout';

export const GraphComponent = (props: any) => {
  const newGraph = MultiDirectedGraph.from(props.graph);
  random.assign(newGraph);
  newGraph.forEachNode((node) => {
    newGraph.setNodeAttribute(node, 'size', 10);
    newGraph.setNodeAttribute(node, 'color', 'red');
  });

  return (
    <SigmaContainer
      style={{ height: '800px', width: '800px' }}
      graph={newGraph}
    ></SigmaContainer>
  );
};
