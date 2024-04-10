import React from "react";
import Header from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { TypographyH2 } from "../components/Typography/Typography";
import "../styles/Templates.css";
import { Icons8Plus } from "../images/plus-icon.tsx";

const buttons = [
  { id: 1, name: "Template 1" },
  { id: 2, name: "Template 2" },
  { id: 3, name: "Template 3" },
  { id: 4, name: "Template 4" },
  { id: 5, name: "Template 5" },
];

const TemplateButton = ({ id, name }) => {
  const navigate = useNavigate();

  return (
    <button
      id={`templateButton-${id}`}
      className="templateButton"
      onClick={() => navigate(`/templates/${id}`)}
    >
      <TypographyH2 style={{ color: "white" }}>{name}</TypographyH2>
    </button>
  );
};

function Templates() {
  const lastId = buttons[buttons.length - 1].id;

  return (
    <div>
      <Header> Templates </Header>
      <div className="template">
        <TemplateButton
          key={lastId + 1}
          id={lastId + 1}
          name={<Icons8Plus />} // Pass the icon component here
        />
        {buttons.map((button) => (
          <TemplateButton key={button.id} id={button.id} name={button.name} />
        ))}
      </div>
    </div>
  );
}
export default Templates;
