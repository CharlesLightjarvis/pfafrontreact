import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import axios from "axios";

const AjoutRaisonVisites = () => {
  const navigate = useNavigate();
  const [raisonVisite, setRaisonVisite] = useState({
    nom: "", // Assuming RaisonVisites also have a 'nom' field
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/RaisonVisites`, raisonVisite);
      // Redirection vers "/raisonvisites" with a success message
      navigate(`/raisonvisites?toastMessage=Opération réussie`);
    } catch (error) {
      console.error("Error adding raison visite:", error);
      // Optionally handle the error by displaying a Snackbar here
    }
  };

  return (
    <Paper style={{ padding: "16px", margin: "auto", maxWidth: "600px" }}>
      <Typography variant="h6" style={{ marginBottom: "10px" }}>
        Ajout Raison Visite
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Nom"
              name="nom"
              value={raisonVisite.nom}
              onChange={(e) =>
                setRaisonVisite({ ...raisonVisite, nom: e.target.value })
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

export default AjoutRaisonVisites;
