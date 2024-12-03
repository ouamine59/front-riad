import React from "react";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./assets/redux/store";
// components
import Header from "./components/client/header/Header";

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Outlet />
    </Provider>
  );
};

export default App;
