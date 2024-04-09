import React from "react";
import { TypographyH1 } from "../Typography/Typography";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <>
      <TypographyH1 className={styles.header}>{props.children}</TypographyH1>
      <hr className={styles.headerHr} />
    </>
  );
};

export default Header;
