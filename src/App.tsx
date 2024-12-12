import React from "react";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./assets/redux/store";
// components
import Header from "./components/client/header/Header";
import Footer from "./components/client/footer/Footer";

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <main>
        <Outlet />
      </main>

      <Footer />
    </Provider>
  );
};

export default App;
