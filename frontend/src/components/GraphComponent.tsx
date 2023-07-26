import {
  SigmaContainer,
  useRegisterEvents,
  ControlsContainer,
  ZoomControl,
  FullScreenControl,
  useSigma,
} from '@react-sigma/core';
import '@react-sigma/core/lib/react-sigma.min.css';
import { useCallback, useEffect, useState } from 'react';
import { ChangeNodeAttributesModal } from './modals/ChangeNodeAttributesModal';
import Graph from 'graphology';
import { ChangeEdgeAttributesModal } from './modals/ChangeEdgeAttributes';
import Sigma from 'sigma';
import FileSaver from 'file-saver';

interface IGraphProps {
  graph: Graph;
  downloadGraphState: boolean;
  setDownloadState: () => void;
}

interface IDownloadGraphComponent {
  downloadState: boolean;
  setDownloadState: () => void;
}

export const GraphComponent = (props: IGraphProps) => {
  const [nodeFormModalStatus, setNodeFormModalStatus] =
    useState<boolean>(false);
  const [edgeFormModalStatus, setEdgeFormModalStatus] =
    useState<boolean>(false);
  const [currentNode, setCurrentNode] = useState<string>();
  const [currentEdge, setCurrentEdge] = useState<string>();

  const DownloadGraph = ({
    downloadState,
    setDownloadState,
  }: IDownloadGraphComponent) => {
    const sigma = useSigma();
    const saveAsPng = useCallback(() => {
      if (sigma) {
        const { height, width } = sigma.getDimensions();
        const inputLayers = ['edges', 'nodes', 'edgeLabels', 'labels'];

        const pixelRatio = window.devicePixelRatio || 1;

        const tmpRoot = document.createElement('DIV');
        tmpRoot.style.width = `${width}px`;
        tmpRoot.style.height = `${height}px`;
        tmpRoot.style.position = 'absolute';
        tmpRoot.style.right = '101%';
        tmpRoot.style.bottom = '101%';
        document.body.appendChild(tmpRoot);

        // Instantiate sigma:
        const tmpRenderer = new Sigma(
          sigma.getGraph(),
          tmpRoot,
          sigma.getSettings()
        );

        // Copy camera and force to render now, to avoid having to wait the schedule /
        // debounce frame:
        tmpRenderer.getCamera().setState(sigma.getCamera().getState());
        tmpRenderer.refresh();

        // Create a new canvas, on which the different layers will be drawn:
        const canvas = document.createElement('CANVAS') as HTMLCanvasElement;
        canvas.setAttribute('width', width * pixelRatio + '');
        canvas.setAttribute('height', height * pixelRatio + '');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        // Draw a white background first:
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, width * pixelRatio, height * pixelRatio);

        // For each layer, draw it on our canvas:
        const canvases = tmpRenderer.getCanvases();
        const layers = inputLayers
          ? inputLayers.filter((id) => !!canvases[id])
          : Object.keys(canvases);
        layers.forEach((id) => {
          ctx.drawImage(
            canvases[id],
            0,
            0,
            width * pixelRatio,
            height * pixelRatio,
            0,
            0,
            width * pixelRatio,
            height * pixelRatio
          );
        });

        // Save the canvas as a PNG image:
        return canvas.toBlob((blob) => {
          if (blob) FileSaver.saveAs(blob, 'graph.png');

          // Cleanup:
          tmpRenderer.kill();
          tmpRoot.remove();
        }, 'image/png');
      }
      console.log('retornando nada');
      return;
    }, [sigma]);

    useEffect(() => {
      //download the graph when the state variable changes to true
      if (downloadState === true) {
        saveAsPng();
        setDownloadState();
      }
      return;
    }, [saveAsPng, setDownloadState, downloadState]);
    return null;
  };

  const GraphEvents: React.FC = () => {
    const sigma = useSigma();
    const [draggedNode, setDraggedNode] = useState<string | null>(null);
    const registerEvents = useRegisterEvents();

    useEffect(() => {
      // Register the events
      registerEvents({
        // node events
        doubleClickNode: (event) => {
          setCurrentNode(event.node);
          setNodeFormModalStatus(true);
          event.preventSigmaDefault();
        },
        clickEdge: (event) => {
          setCurrentEdge(event.edge);
          setEdgeFormModalStatus(true);
          event.preventSigmaDefault();
        },

        downNode: (event) => {
          setDraggedNode(event.node);
          sigma.getGraph().setNodeAttribute(event.node, 'highlighted', true);
        },
        mouseup: () => {
          if (draggedNode) {
            setDraggedNode(null);
            sigma.getGraph().removeNodeAttribute(draggedNode, 'highlighted');
          }
        },
        mousedown: () => {
          // Disable the autoscale at the first down interaction
          if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
        },
        mousemove: (event) => {
          if (draggedNode) {
            // Get new position of node
            const pos = sigma.viewportToGraph(event);
            sigma.getGraph().setNodeAttribute(draggedNode, 'x', pos.x);
            sigma.getGraph().setNodeAttribute(draggedNode, 'y', pos.y);

            // Prevent sigma to move camera:
            event.preventSigmaDefault();
            event.original.preventDefault();
            event.original.stopPropagation();
          }
        },
        touchup: () => {
          if (draggedNode) {
            setDraggedNode(null);
            sigma.getGraph().removeNodeAttribute(draggedNode, 'highlighted');
          }
        },
        touchdown: () => {
          // Disable the autoscale at the first down interaction
          if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
        },
        touchmove: (event) => {
          if (draggedNode) {
            // Get new position of node
            const pos = sigma.viewportToGraph(event.touches[0]);
            sigma.getGraph().setNodeAttribute(draggedNode, 'x', pos.x);
            sigma.getGraph().setNodeAttribute(draggedNode, 'y', pos.y);

            // Prevent sigma to move camera:
            event.original.preventDefault();
            event.original.stopPropagation();
          }
        },
      });
    }, [registerEvents, sigma, draggedNode]);

    return null;
  };
  return (
    <>
      <SigmaContainer
        style={{ height: '98%', width: '98%' }}
        graph={props.graph}
        settings={{
          renderEdgeLabels: true,
          renderLabels: true,
          labelRenderedSizeThreshold: 0,
        }}
      >
        <ControlsContainer position={'bottom-right'}>
          <ZoomControl />
          <FullScreenControl />
        </ControlsContainer>
        <GraphEvents />
        {props.downloadGraphState === true && (
          <DownloadGraph
            downloadState={props.downloadGraphState}
            setDownloadState={props.setDownloadState}
          />
        )}
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
