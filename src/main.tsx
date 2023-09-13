import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "./index.css";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
// import Header from "./layout/Header/Header.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <Header /> */}
      <App />
    </Provider>
  </React.StrictMode>
);
