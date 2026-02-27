import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Onboarding } from "./components/Onboarding";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { Upload } from "./components/Upload";
import { Preview } from "./components/Preview";
import { Export } from "./components/Export";
import { History } from "./components/History";
import { Profile } from "./components/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Onboarding },
      { path: "login", Component: Login },
      { path: "dashboard", Component: Dashboard },
      { path: "upload", Component: Upload },
      { path: "preview", Component: Preview },
      { path: "export", Component: Export },
      { path: "history", Component: History },
      { path: "profile", Component: Profile },
    ],
  },
]);
