import { normalRoutes } from './router';
import { RouterProvider } from 'react-router-dom';

function App() {
  return <RouterProvider router={normalRoutes}></RouterProvider>;
}

export default App;
