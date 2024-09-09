import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import store from "./state/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthContextProvider>
  </React.StrictMode>
);
