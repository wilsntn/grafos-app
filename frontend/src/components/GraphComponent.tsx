import {
  SigmaContainer,
  useRegisterEvents,
  ControlsContainer,
  ZoomControl,
  FullScreenControl,
} from '@react-sigma/core';
import '@react-sigma/core/lib/react-sigma.min.css';
import { useEffect, useState } from 'react';
import { ChangeNodeAttributesModal } from './modals/ChangeNodeAttributesModal';
import Graph from 'graphology';
import { ChangeEdgeAttributesModal } from './modals/ChangeEdgeAttributes';

interface IGraphProps {
  graph: Graph;
}

export const GraphComponent = (props: IGraphProps) => {
  const [nodeFormModalStatus, setNodeFormModalStatus] =
    useState<boolean>(false);
  const [edgeFormModalStatus, setEdgeFormModalStatus] =
    useState<boolean>(false);
  const [currentNode, setCurrentNode] = useState<string>();
  const [currentEdge, setCurrentEdge] = useState<string>();

  const GraphEvents: React.FC = () => {
    const registerEvents = useRegisterEvents();

    useEffect(() => {
      // Register the events
      registerEvents({
        // node events
        clickNode: (event) => {
          setCurrentNode(event.node);
          setNodeFormModalStatus(true);
          event.preventSigmaDefault;
        },
        clickEdge: (event) => {
          setCurrentEdge(event.edge);
          setEdgeFormModalStatus(true);
          event.preventSigmaDefault;
        },
        // enterEdge: (event) => console.log('enterEdge', event.edge),
        // leaveEdge: (event) => console.log('leaveEdge', event.edge),
        // // sigma kill
        // kill: () => console.log('kill'),
        // resize: () => console.log('resize'),
        // beforeRender: () => console.log('beforeRender'),
        // afterRender: () => console.log('afterRender'),
        // // sigma camera update
        // updated: (event) =>
        // console.log('updated', event.x, event.y, event.angle, event.ratio),
      });
    }, [registerEvents]);

    return null;
  };
  return (
    <>
      <SigmaContainer
        style={{ height: '98%', width: '98%' }}
        graph={props.graph}
        settings={{ renderEdgeLabels: true, renderLabels: true }}
      >
        <ControlsContainer position={'bottom-right'}>
          <ZoomControl />
          <FullScreenControl />
        </ControlsContainer>
        <GraphEvents />
      </SigmaContainer>
      <ChangeNodeAttributesModal
        show={nodeFormModalStatus}
        setModalState={() => setNodeFormModalStatus(!nodeFormModalStatus)}
        node={currentNode}
      />
      <ChangeEdgeAttributesModal
        show={edgeFormModalStatus}
        setModalState={() => setEdgeFormModalStatus(!edgeFormModalStatus)}
        edge={currentEdge}
      />
    </>
  );
};
