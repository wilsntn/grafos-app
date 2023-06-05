import {
  ControlsContainer,
  FullScreenControl,
  SearchControl,
  SigmaContainer,
  ZoomControl,
} from '@react-sigma/core';

export function Graph() {
  return (
    <SigmaContainer
      graph={graph}
      style={{ height: '500px' }}
      settings={{
        nodeProgramClasses: { image: getNodeProgramImage() },
        defaultNodeType: 'image',
        defaultEdgeType: 'arrow',
        labelDensity: 0.07,
        labelGridCellSize: 60,
        labelRenderedSizeThreshold: 15,
        labelFont: 'Lato, sans-serif',
        zIndex: true,
      }}
    >
      <ControlsContainer position={'bottom-right'}>
        <ZoomControl />
        <FullScreenControl />
      </ControlsContainer>
      <ControlsContainer position={'top-right'}>
        <SearchControl style={{ width: '200px' }} />
      </ControlsContainer>
    </SigmaContainer>
  );
}
