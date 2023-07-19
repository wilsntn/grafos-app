import {
  SigmaContainer,
  useRegisterEvents,
  ControlsContainer,
  ZoomControl,
  FullScreenControl,
} from '@react-sigma/core';
import '@react-sigma/core/lib/react-sigma.min.css';
import { useEffect } from 'react';

export const GraphComponent = (props: any) => {
  const GraphEvents: React.FC = () => {
    const registerEvents = useRegisterEvents();

    useEffect(() => {
      // Register the events
      registerEvents({
        // node events
        clickNode: (event) =>
          console.log(
            'clickNode',
            event.event,
            event.node,
            event.preventSigmaDefault
          ),
        // doubleClickNode: (event) =>
        //   console.log(
        //     'doubleClickNode',
        //     event.event,
        //     event.node,
        //     event.preventSigmaDefault
        //   ),
        // enterNode: (event) => console.log('enterNode', event.node),
        // leaveNode: (event) => console.log('leaveNode', event.node),
        // // edge events
        // clickEdge: (event) =>
        //   console.log(
        //     'clickEdge',
        //     event.event,
        //     event.edge,
        //     event.preventSigmaDefault
        //   ),
        // doubleClickEdge: (event) =>
        //   console.log(
        //     'doubleClickEdge',
        //     event.event,
        //     event.edge,
        //     event.preventSigmaDefault
        //   ),
        // rightClickEdge: (event) =>
        //   console.log(
        //     'rightClickEdge',
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
        //   console.log('updated', event.x, event.y, event.angle, event.ratio),
      });
    }, [registerEvents]);

    return null;
  };
  return (
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
  );
};
