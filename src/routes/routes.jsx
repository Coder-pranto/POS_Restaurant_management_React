import { Navigate, createBrowserRouter } from "react-router-dom";
// import ProtectedRoute from './ProtectedRoute';
import InitialLayout from "../layouts/InitialLayout";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Menu from "../pages/Menu";
import Payment from "../pages/Payment";



const router = createBrowserRouter([
  {
    path: "/", 
    errorElement: <ErrorPage />,
    element: <Navigate to="/login" replace={true} />
  },
  {
    path: "/",
    element: <InitialLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element:<Dashboard/>
      },
      {
        path: "/menu",
        element:<Menu/>
      },
      {
        path: "/payment",
        element:<Payment />
      },
    //   {
    //     path: "/menu",
    //     element: <ProtectedRoute element={<Products />} />,
    //   }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
