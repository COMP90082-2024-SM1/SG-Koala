import React, { useState } from "react";
import { TypographyH3 } from "../Typography/Typography";
import styles from "./Button.module.css";

export const Button = ({ onClick, className, style, type, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonColor = {
    save: "var(--positive-color)",
    delete: "var(--negative-color)",
    discard: "var(--primary-color)",
    submit:  "var(--positive-color)",
  };

  const combinedStyle = {
    ...style,
    color: buttonColor[type],
  };

  const buttonClass = `${styles.button} ${styles[type]} ${className || ""}`;

  return (
    <button
      onClick={onClick}
      className={buttonClass}
      style={combinedStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TypographyH3 style={{ color: isHovered ? "white" : buttonColor[type] }}>
        {children}
      </TypographyH3>
    </button>
  );
};
