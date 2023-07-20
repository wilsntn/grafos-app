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

export const GraphComponent = (props: any) => {
  const [nodeFormModalStatus, setNodeFormModalStatus] =
    useState<boolean>(false);
  const [currentNode, setCurrentNode] = useState<string>();
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
        doubleClickNode: (event) => {
          event.preventSigmaDefault;
        },

        // clickEdge: (event) =>
        //   console.log(
        //     'clickEdge',
        //     event.event,
        //     event.edge,
        //     event.preventSigmaDefault
        //   ),
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
    </>
  );
};
