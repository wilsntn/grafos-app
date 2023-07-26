import { useEffect } from 'react';
import { useMenuState } from '../hooks/menuHook';

export function HomePage() {
  const { setMenuState } = useMenuState();
  useEffect(() => {
    setMenuState(true);
  }, [setMenuState]);
  return <></>;
}
