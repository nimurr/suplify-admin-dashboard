import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css'
import Home from "./home/Home.jsx";

import { RouterProvider } from "react-router-dom";
import router from "./router/Route.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import SocketProvider from "./context/SocketContext.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <SocketProvider >
        <RouterProvider router={router}>
          <Home></Home>
        </RouterProvider>
      </SocketProvider>
    </Provider>
  </StrictMode>
);
