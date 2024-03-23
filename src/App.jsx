import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  About,
  HomeLayout,
  Landing,
  Error,
  Newsletter,
  Cocktail,
  SinglePageError,
} from "./Pages";
import { loader as landingLoader } from "./Pages/Landing";
import { loader as singleCocktailLoader } from "./Pages/Cocktail";
import { action as newsLetterAction } from "./Pages/Newsletter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: landingLoader(queryClient),
      },
      {
        path: "cocktail/:id",
        errorElement: <SinglePageError />,
        loader: singleCocktailLoader(queryClient),
        element: <Cocktail />,
      },
      {
        path: "newsletter",
        element: <Newsletter />,
        action: newsLetterAction,
        errorElement: <SinglePageError />,
      },
      {
        path: "about",
        element: <About />,
        children: [
          {
            path: "company",
            element: <h2>Our company</h2>,
          },
          {
            path: "person",
            element: <h2>peter parker</h2>,
          },
        ],
      },
    ],
  },
]);
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
