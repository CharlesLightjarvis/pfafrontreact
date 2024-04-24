import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import axios from "axios";

const AjoutTypeVisiteurs = () => {
  const navigate = useNavigate();
  const [typeVisiteur, setTypeVisiteur] = useState({
    nom: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/TypeVisiteurs`, typeVisiteur);
      // Redirection vers "/typevisiteurs" avec un message de succès
      navigate(`/typevisiteurs?toastMessage=Opération réussie`);
    } catch (error) {
      console.error("Error adding type de visiteur:", error);
      // Vous pouvez aussi gérer l'erreur en affichant un Snackbar ici
    }
  };

  return (
    <Paper style={{ padding: "16px", margin: "auto", maxWidth: "600px" }}>
      <Typography variant="h6" style={{ marginBottom: "10px" }}>
        Ajout Type Visiteur
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Nom"
              name="nom"
              value={typeVisiteur.nom}
              onChange={(e) =>
                setTypeVisiteur({ ...typeVisiteur, nom: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Enregistrer
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AjoutTypeVisiteurs;
