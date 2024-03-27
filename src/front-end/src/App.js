import React from "react";
import {
  TypographyH1,
  TypographyH2,
  TypographyParagraph,
} from "./components/Typography/Typography";

const App = () => (
  <div>
    <TypographyH1 style={{ color: "blue" }}>This is an H1 Header</TypographyH1>
    <TypographyH2>This is an H2 Header</TypographyH2>
    <TypographyParagraph>This is a paragraph</TypographyParagraph>
  </div>
);

export default App;
