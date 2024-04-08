import React from "react";
import Header from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { TypographyH2 } from "../components/Typography/Typography";
import "../styles/Templates.css";

const buttons = [1, 2, 3, 4, 5];

const TemplateButton = ({ id }) => {
  const navigate = useNavigate();

  return (
    <button
      id={`templateButton-${id}`}
      className="templateButton"
      onClick={() => navigate(`/templates/${id}`)}
    >
      <TypographyH2 style={{ color: "white" }}>{`Template ${id}`}</TypographyH2>
    </button>
  );
};

function Templates() {
  return (
    <div>
      <Header> Templates </Header>
      <div className="template">
        {buttons.map((id) => (
          <TemplateButton key={id} id={id} />
        ))}
      </div>
    </div>
  );
}
export default Templates;
