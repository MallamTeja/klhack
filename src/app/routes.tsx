import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Landing } from "./components/Landing";
import { Onboarding } from "./components/Onboarding";
import { Dashboard } from "./components/Dashboard";
import { Upload } from "./components/Upload";
import { Preview } from "./components/Preview";
import { Export } from "./components/Export";
import { Pricing } from "./components/Pricing";
import { History } from "./components/History";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Landing },
      { path: "onboarding", Component: Onboarding },
      { path: "dashboard", Component: Dashboard },
      { path: "upload", Component: Upload },
      { path: "preview", Component: Preview },
      { path: "export", Component: Export },
      { path: "pricing", Component: Pricing },
      { path: "history", Component: History },
    ],
  },
]);
