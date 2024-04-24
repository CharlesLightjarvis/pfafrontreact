import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import axios from "axios";

const EditTypeVisiteurs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [typeVisiteur, setTypeVisiteur] = useState({
    nom: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/TypeVisiteurs/${id}`
        );
        setTypeVisiteur(response.data);
      } catch (error) {
        console.error("Error fetching type visiteur data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/TypeVisiteurs/${id}`,
        typeVisiteur
      );
      // Redirection vers "/typevisiteurs" with a success message
      navigate(`/typevisiteurs?toastMessage=Opération réussie`);
    } catch (error) {
      console.error("Error updating type visiteur:", error);
      // Here, you could also handle errors by showing a Snackbar
    }
  };

  return (
    <Paper style={{ padding: "16px", margin: "auto", maxWidth: "600px" }}>
      <Typography variant="h6" style={{ marginBottom: "10px" }}>
        Édition Type de Visiteur
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

export default EditTypeVisiteurs;
