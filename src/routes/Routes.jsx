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
import { Dashboard } from "../Layouts/Dashboard";
import { Users } from "../Pages/Dashboard/users";
import { AllArticle } from "../Pages/Dashboard/allArticle";
import { PublisherPage } from "../Pages/Dashboard/publisher";
import { Error404 } from "../Pages/Error/Error404";
import { PremiumRoute } from "./PremiumRoute";
import { PublicationCharts } from "../Pages/Dashboard/PublicationCharts";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error404 />,
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
            <PremiumRoute>
              <Premium />
            </PremiumRoute>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {index:true, element:<PublicationCharts/>},
      {
        path: "users",
        element: <Users />,
      },
      { path: "articles", element: <AllArticle /> },
      { path: "publisher", element: <PublisherPage /> },
    ],
  },
]);
