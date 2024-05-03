import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Box, Grid } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SingleVisite = () => {
  const { id } = useParams();
  const [visite, setVisite] = useState(null);

  useEffect(() => {
    const fetchVisite = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/Visites/${id}`
        );
        setVisite(response.data.data);
      } catch (error) {
        console.error("Error fetching visite:", error);
      }
    };
    fetchVisite();
  }, [id]);

  if (!visite) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3, borderRadius: "4px" }}>
      <Typography variant="h5" gutterBottom>
        Détails de la Visite
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <strong>UID :</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <strong>Nom :</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <strong>Prenom :</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <strong>Telephone :</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <strong>Email :</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <strong>Type Visiteur :</strong>
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <strong>Date de début:</strong>
          </Typography>
          <Typography variant="body2">
            <DatePicker
              selected={new Date(visite.dateHeureDebut)}
              dateFormat="dd/MM/yyyy HH:mm"
              readOnly
              customInput={
                <input
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "default",
                  }}
                />
              }
            />
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <strong>Date de fin:</strong>
          </Typography>
          <Typography variant="body2">
            <DatePicker
              selected={new Date(visite.dateHeureFin)}
              dateFormat="dd/MM/yyyy HH:mm"
              readOnly
              customInput={
                <input
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "default",
                  }}
                />
              }
            />
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <strong>Type de visite:</strong> {visite.typeVisiteNom}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <strong>Statut:</strong> {visite.statutNom}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            <strong>Détails:</strong>
          </Typography>
          <Typography variant="body2">{visite.details}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleVisite;
