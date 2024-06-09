import "./App.css";
import HomePage from "./components/homepage/HomePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUpLogin from "./components/signUpLogin/SignUpLogin";
import Upload from "./components/upload/Upload";
import { UserProvider } from "./context/UserProvider";
import UploadTechs from "./components/uploadTechs/UploadTechs";
import "./styles/tailwind.css";

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
    {
      path: "/add",
      element: <UploadTechs input={true} />,
    },
  ]);
  return (
    <div className="App">
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </div>
  );
}

export default App;
