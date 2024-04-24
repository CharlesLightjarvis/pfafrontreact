import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import axios from "axios";

const AjoutPersonnels = () => {
  const navigate = useNavigate();
  const [personnel, setPersonnel] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    poste: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/Personnel`, personnel);
      // Redirection vers "/personnels" avec un message de succès
      navigate(`/personnels?toastMessage=Opération réussie`);
    } catch (error) {
      console.error("Error adding personnel:", error);
      // Vous pouvez aussi gérer l'erreur en affichant un Snackbar ici
    }
  };

  return (
    <Paper style={{ padding: "16px", margin: "auto", maxWidth: "600px" }}>
      <Typography variant="h6" style={{ marginBottom: "10px" }}>
        Ajout personnel
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="Nom"
              name="nom"
              value={personnel.nom}
              onChange={(e) =>
                setPersonnel({ ...personnel, nom: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="Prénom"
              name="prenom"
              value={personnel.prenom}
              onChange={(e) =>
                setPersonnel({ ...personnel, prenom: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Téléphone"
              name="telephone"
              value={personnel.telephone}
              onChange={(e) =>
                setPersonnel({ ...personnel, telephone: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Poste"
              name="poste"
              value={personnel.poste}
              onChange={(e) =>
                setPersonnel({ ...personnel, poste: e.target.value })
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

export default AjoutPersonnels;
