import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import axios from "axios";

const EditRaisonVisites = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [raisonVisite, setRaisonVisite] = useState({
    nom: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/RaisonVisites/${id}`
        );
        setRaisonVisite(response.data);
      } catch (error) {
        console.error("Error fetching raison visite data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/RaisonVisites/${id}`,
        raisonVisite
      );
      // Redirection to "/raisonvisites" with a success message
      navigate(`/raisonvisites?toastMessage=Opération réussie`);
    } catch (error) {
      console.error("Error updating raison visite:", error);
      // Optionally handle the error by displaying a Snackbar
    }
  };

  return (
    <Paper style={{ padding: "16px", margin: "auto", maxWidth: "600px" }}>
      <Typography variant="h6" style={{ marginBottom: "10px" }}>
        Édition Raison de Visite
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

export default EditRaisonVisites;
