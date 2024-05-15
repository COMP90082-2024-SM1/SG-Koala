import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { TypographyH2 } from "../components/Typography/Typography";
import { Icons8Plus } from "../images/plus-icon.tsx";
import { getAllTemplates } from "../api/TemplateAPI";
import "../styles/Templates.css";

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
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const data = await getAllTemplates();
        setTemplates(data);
      } catch (error) {
        alert("[ERROR] Failed to fetch templates.");
      }
      setLoading(false);
    };

    fetchTemplates();
  }, []);

  return (
    <>
      <Header>Template Collection</Header>
      {loading && <p>Loading...</p>}
      <div className="template">
        {!loading && (
          <>
            {templates.length > 0 && (
              <TemplateButton
                key="create-new"
                id="create-new"
                name={<Icons8Plus />}
              />
            )}
            {templates.map((template) => (
              <TemplateButton
                key={template.id}
                id={template.id}
                name={template.name}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
export default Templates;
