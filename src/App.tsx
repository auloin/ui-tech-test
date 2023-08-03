import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import Designer from './pages/Designer/Designer'
import Response from './pages/Response';
import Layout from './components/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/*
  - RouterProvider: Provide the router to the application
  - createBrowserRouter: Create a browser router
  - redirect: Redirect to a specific path
*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/designer",
        element: <Designer />,
      },
      {
        path: "/filler",
        element: <div className='mx-auto mt-10 w-fit text-xl'>Page not found 404</div>
      },
      {
        path: "/response",
        element: <Response />
      }
    ]
  },
  {
    path: "*",
    loader: () => redirect("/designer"),
  }
]);
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
