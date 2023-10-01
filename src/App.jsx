/*   Steps Left
1. Adding firebase setup to signup and login
2. adding functionality to tasks
3.Adding functionality to new tasks 
4. When i relod the page while i am not tasks page i get the dignUp and Login options even if i am already logged in or signed up
5. Add firebase to store data of tasks 
6. Add a progress bar to display daycount and the graph and tick and cross 
7. Add a react portal which will be displayed when 75 days are over saying now you are transformed and capable of achieving great heoghts
8.also do something so that a person can click tick and value increase only once a day by one */

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
