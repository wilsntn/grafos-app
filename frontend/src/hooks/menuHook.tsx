import { ReactNode, createContext, useContext } from 'react';
import { useState } from 'react';

interface IMenuStateContext {
  menuState: boolean;
  setMenuState: (menuState: boolean) => void;
}

const initialContextValue = {
  menuState: false,
  setMenuState: () => {
    return;
  },
};

interface IProps {
  children: ReactNode;
}

const menuStateContext = createContext<IMenuStateContext>(initialContextValue);

export function MenuStateProvider({ children }: IProps) {
  const [menuState, setMenuState] = useState(false);
  return (
    <menuStateContext.Provider value={{ menuState, setMenuState }}>
      {children}
    </menuStateContext.Provider>
  );
}

export function useMenuState() {
  const { menuState, setMenuState } = useContext(menuStateContext);

  return { menuState, setMenuState };
}
