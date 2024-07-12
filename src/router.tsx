import { createBrowserRouter } from "react-router-dom";
import DetailsView from "./views/Details";
import Layout  from "./layouts/Home";
import AuthLayout from "./layouts/Auth";
import { Login } from "./views/Auth/Login";
import ProtectedRoutes from "./protectedRoutes";
import { ProductsView } from "./views/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: '/sing-up',
        element: <Login />,
      },
    ]
  },
  {
    path: "/products",
    element: (
      <ProtectedRoutes>
        <Layout />
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <ProductsView />,
      },
      {
        path: "/products/:productId",
        element: <DetailsView />,
      }
    ],
  },
]);
