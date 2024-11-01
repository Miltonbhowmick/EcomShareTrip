import { createBrowserRouter } from "react-router-dom";
import LayoutDefault from "../layout/default";
import IndexPage from "../pages";
import ProductIndexPage from "../pages/product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <IndexPage />,
      },
      {
        path: "products/:productId",
        element: <ProductIndexPage/>
      }
    ],
  },
]);

export default router;
