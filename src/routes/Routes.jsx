import { createBrowserRouter } from "react-router-dom";
import { Main } from "../Layouts/Main";
import { Article } from "../Pages/Article";
import { Login } from "../components/Forms/Login";
import { Register } from "../components/Forms/Register";
import { ProtectedRoute } from "./ProtectedRoute";
import { ArticleView } from "../components/Article/ArticleView";
import { ArticleDetails } from "../Pages/ArticleDetails";
import { Subscribe } from "../Pages/Subscribe";
import { Home } from "../Pages/Home";
import { UpdateProfile } from "../Pages/UpdateProfile";
import { MyArticles } from "../Pages/MyArticles";
import { Premium } from "../Pages/Premium";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <>Error Page</>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "add-article",
        element: (
          <ProtectedRoute>
            <Article />
          </ProtectedRoute>
        ),
      },

      {
        path: "all-articles",
        children: [
          { index: true, element: <ArticleView /> },
          {
            path: ":id",
            element: (
              <ProtectedRoute>
                <ArticleDetails />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "my-articles",
        element: (
          <ProtectedRoute>
            <MyArticles />
          </ProtectedRoute>
        ),
      },
      {
        path: "subscribe",
        element: (
          <ProtectedRoute>
            <Subscribe />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "premium",
        element: (
          <ProtectedRoute>
            <Premium />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
