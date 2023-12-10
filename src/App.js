import logo from "./logo.svg";
import "./App.css";
import HomePage from "./components/homepage/HomePage";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUpLogin from "./components/signUpLogin/SignUpLogin";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <SignUpLogin />,
    },
    {
      path: "/signup",
      element: <SignUpLogin />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
