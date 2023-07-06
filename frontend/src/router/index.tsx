import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { HomePage } from '../pages/Home.page';
import { CreateGraph } from '../pages/CreateGraph.page';
import { GenerateGraph } from '../pages/GenerateGraph.page';
import { ImportGraph } from '../pages/ImportGraph.page';

export const normalRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'createGraph',
        element: <CreateGraph />,
      },
      {
        path: 'createRandom',
        element: <GenerateGraph />,
      },
      {
        path: 'importGraph',
        element: <ImportGraph />,
      },
    ],
  },
]);
