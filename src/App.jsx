import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import RootLayout from "./Pages/Root";
import ErrorPage from "./Pages/Error";
import Tasks from "./Pages/Tasks";
import LogIn from "./Authentication/LogIn";
import SignUp from "./Authentication/SignUp";
import EditTasks from "./Pages/EditTasks";
import Progress from "./Pages/Progress";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/tasks", element: <Tasks /> },
        { path: "/prog", element: <Progress /> },
        { path: "/signUp", element: <SignUp /> },
        { path: "/logIn", element: <LogIn /> },
        { path: "/edittasks", element: <EditTasks /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
