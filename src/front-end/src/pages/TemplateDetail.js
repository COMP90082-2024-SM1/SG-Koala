import React from "react";
import { useParams } from "react-router-dom";

const TemplateDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Template Detail for ID: {id}</h2>
    </div>
  );
};

export default TemplateDetail;
