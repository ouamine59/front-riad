import React from "react";
import { useMediaQuery } from "react-responsive";
import "./header.css";

const Header = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1225px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(min-width: 380px)" });
  let className;
  if (isBigScreen) {
    className = "mx-auto bg-primary";
  } else if (isTabletOrMobile) {
    className = "mx-auto bg-primary";
  }
  return <header className={className}>a</header>;
};

export default Header;
