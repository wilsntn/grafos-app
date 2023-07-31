import dynamic from 'next/dynamic';
import Graph from 'graphology';

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
import '@react-sigma/core/lib/react-sigma.min.css';

interface IGraphProps {
  graph: Graph;
  setGraph: () => void;
}

export function GraphComponent(props: IGraphProps) {
  //subir esse lógica para a página de importar o grafo e manipular o objeto do grafo e deixar para o componente apenas para renderização do grafo

  return (
    <SigmaContainer
      style={{ height: '100%', width: '100%' }}
      graph={props.graph}
    >
      <ControlsContainer position={'bottom-right'}>
        <ZoomControl />
        <FullScreenControl />
      </ControlsContainer>
      <ControlsContainer position={'top-right'}>
        <SearchControl style={{ width: '100px' }} />
      </ControlsContainer>
    </SigmaContainer>
  );
}
