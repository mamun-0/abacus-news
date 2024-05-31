import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <>Main component</>,
    errorElement: <>Error Page</>,
  },
  { path: "/login", element: <>Login</> },
  { path: "/signup", element: <>Signup</> },
]);
