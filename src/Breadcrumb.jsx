import React from "react";
import { Breadcrumbs, Link } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbStyle = {
    color: "#666",
    textDecoration: "none",
    "&:hover": {
      color: "darkslategray",
      textDecoration: "underline",
    },
  };

  // Liste des segments à rendre visibles mais non cliquables
  const nonClickableSegments = ["edit", "add", "update", "delete"];

  // Fonction pour déterminer si un segment est un ID numérique
  const isNumericID = (segment) => {
    return !isNaN(segment);
  };

  // Fonction pour déterminer si un segment doit être rendu non cliquable
  const isNonClickable = (segment) => {
    return nonClickableSegments.includes(segment.toLowerCase());
  };

  return (
    <div style={{ margin: 16 }}>
      <Breadcrumbs aria-label="breadcrumb" separator=" / ">
        <Link component={RouterLink} to="/" sx={breadcrumbStyle}>
          Home
        </Link>
        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          // Ne pas afficher les segments numériques
          if (isNumericID(value)) {
            return null;
          }

          // Traiter les cas de segments non cliquables
          if (isLast || isNonClickable(value)) {
            return (
              <span key={to} style={{ color: "#666", cursor: "default" }}>
                {value.replace("-", " ").replace("_", " ")}
              </span>
            );
          }

          return (
            <Link key={to} component={RouterLink} to={to} sx={breadcrumbStyle}>
              {value.replace("-", " ").replace("_", " ")}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
