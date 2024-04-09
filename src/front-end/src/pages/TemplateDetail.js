import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";

const TemplateDetail = () => {
  const details = {
    id: 1,
    templateName: "Template 1",
    content: [
      { task: "See Priava", order: 0, link: "https://google.com" },
      { task: "See Priava", order: 1, link: "https://google.com" },
      { task: "See Priava", order: 2, link: "https://google.com" },
      { task: "See Priava", order: 3, link: "https://google.com" },
      { task: "See Priava", order: 4, link: "https://google.com" },
    ],
  };

  const { id } = useParams();

  return (
    <div>
      <Header> Template : {id} </Header>
    </div>
  );
};

export default TemplateDetail;
