import React from "react";
import styles from "./Typography.module.css";

export const TypographyH1 = ({ className, style, children }) => {
  return (
    <h1 className={`${styles.typographyH1} ${className || ""}`} style={style}>
      {children}
    </h1>
  );
};

export const TypographyH2 = ({ className, style, children }) => {
  return (
    <h2 className={`${styles.typographyH2} ${className || ""}`} style={style}>
      {children}
    </h2>
  );
};

export const TypographyParagraph = ({ className, style, children }) => {
  return (
    <p
      className={`${styles.typographyParagraph} ${className || ""}`}
      style={style}
    >
      {children}
    </p>
  );
};
