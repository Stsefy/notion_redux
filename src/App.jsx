import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Profile from "./pages/profile/Profile";
import Notes from "./pages/profile/Notes";
import ManageNote from "./pages/profile/ManageNote";
import ViewNote from "./pages/profile/ViewNote";
import BaseRoute from "./pages/BaseRoute";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseRoute />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "notes",
        element: <Notes />,
      },
      {
        path: "notes/create",
        element: <ManageNote />,
      },
      {
        path: "notes/edit/:noteId",
        element: <ManageNote edit />,
      },
      {
        path: "notes/view/:noteId",
        element: <ViewNote />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />
}