import Graph from 'graphology';
import { ReactNode, createContext, useContext } from 'react';
import { useState } from 'react';

interface IGraphContext {
  graphObject: Graph | undefined;
  setGraphObject: (graph: Graph) => void;
}

const initialContextValue = {
  graphObject: new Graph(),
  setGraphObject: () => {},
};

interface IProps {
  children: ReactNode;
}

export const graphContext = createContext<IGraphContext>(initialContextValue);

export function GraphProvider({ children }: IProps) {
  const [graphObject, setGraphObject] = useState(new Graph());
  return (
    <graphContext.Provider value={{ graphObject, setGraphObject }}>
      {children}
    </graphContext.Provider>
  );
}

export function useGraph() {
  const { graphObject, setGraphObject } = useContext(graphContext);

  return { graphObject, setGraphObject };
}
