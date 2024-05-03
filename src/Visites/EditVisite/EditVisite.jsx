import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditVisite = () => {
  const [visite, setVisite] = useState({
    dateHeureDebut: new Date(),
    dateHeureFin: new Date(),
    raisonVisiteId: "",
    typeVisiteId: "",
    statutId: "",
    personnelId: "",
    visiteurId: "",
    details: "",
    visiteurNom: "",
    visiteurPrenom: "",
    visiteurTelephone: "",
    visiteurEmail: "",
    typeVisiteurId: "",
  });
  const [personnel, setPersonnel] = useState([]);
  const [raisonsVisites, setRaisonsVisites] = useState([]);
  const [statuts, setStatuts] = useState([]);
  const [typeVisites, setTypeVisites] = useState([]);
  const [typeVisiteurs, setTypeVisiteurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const visiteRes = await axios.get(
          `http://localhost:5000/api/Visites/${id}`
        );
        const personnelRes = await axios.get(
          "http://localhost:5000/api/Personnel"
        );
        const raisonsRes = await axios.get(
          "http://localhost:5000/api/RaisonVisites"
        );
        const statutsRes = await axios.get("http://localhost:5000/api/Statuts");
        const typeVisitesRes = await axios.get(
          "http://localhost:5000/api/TypeVisites"
        );
        const typeVisiteursRes = await axios.get(
          "http://localhost:5000/api/TypeVisiteurs"
        );
        console.log(visiteRes);
        console.log(personnelRes);
        console.log(raisonsRes);
        console.log(statutsRes);
        console.log(typeVisitesRes);
        console.log(typeVisiteursRes);

        setVisite({
          ...visiteRes.data,
          dateHeureDebut: new Date(visiteRes.data.data.dateHeureDebut),
          dateHeureFin: new Date(visiteRes.data.data.dateHeureFin),
        });
        setPersonnel(personnelRes.data.$values);
        setRaisonsVisites(raisonsRes.data.$values);
        setStatuts(statutsRes.data);
        setTypeVisites(typeVisitesRes.data.$values);
        setTypeVisiteurs(typeVisiteursRes.data.$values);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/Visites/${id}`, visite);
      navigate("/visites?toastMessage=Opération réussie");
    } catch (error) {
      console.error("Error updating visite:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVisite((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (date, fieldName) => {
    setVisite((prevState) => ({ ...prevState, [fieldName]: date }));
  };

  if (loading) {
    return (
      <Paper
        style={{
          padding: "16px",
          margin: "auto",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">Chargement...</Typography>
        <DatePicker />
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: "16px", margin: "auto", maxWidth: "600px" }}>
      <Typography variant="h6" style={{ marginBottom: "20px" }}>
        Encoder une Visite
      </Typography>
      <form onSubmit={handleSubmit}>
        <Typography variant="subtitle1" gutterBottom>
          Informations du visiteur
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nom"
              name="visiteurNom"
              value={visite.visiteurNom}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Prénom"
              name="visiteurPrenom"
              value={visite.visiteurPrenom}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Téléphone"
              name="visiteurTelephone"
              value={visite.visiteurTelephone}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              name="visiteurEmail"
              value={visite.visiteurEmail}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Type de visiteur</InputLabel>
              <Select
                value={visite.typeVisiteurId}
                label="Type de visiteur"
                onChange={(e) =>
                  setVisite({ ...visite, typeVisiteurId: e.target.value })
                }
              >
                {typeVisiteurs.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Typography
          variant="subtitle1"
          gutterBottom
          style={{ marginTop: "20px" }}
        >
          Informations de la visite
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <DatePicker
              selected={visite.dateHeureDebut}
              onChange={(date) => handleDateChange(date, "dateHeureDebut")}
              showTimeSelect
              dateFormat="Pp"
              customInput={<TextField fullWidth />}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              selected={visite.dateHeureFin}
              onChange={(date) => handleDateChange(date, "dateHeureFin")}
              showTimeSelect
              dateFormat="Pp"
              customInput={<TextField fullWidth />}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Personnel</InputLabel>
              <Select
                value={visite.personnelId}
                label="Personnel"
                onChange={(e) =>
                  setVisite({ ...visite, personnelId: e.target.value })
                }
              >
                {personnel.map((person) => (
                  <MenuItem key={person.id} value={person.id}>
                    {person.nom} {person.prenom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Raison de la visite</InputLabel>
              <Select
                value={visite.raisonVisiteId}
                label="Raison de la visite"
                onChange={(e) =>
                  setVisite({ ...visite, raisonVisiteId: e.target.value })
                }
              >
                {raisonsVisites.map((raison) => (
                  <MenuItem key={raison.id} value={raison.id}>
                    {raison.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Statut de la visite</InputLabel>
              <Select value={visite.statutId} label="Statut de la visite">
                {statuts.map((statut) => (
                  <MenuItem key={statut.id} value={statut.id}>
                    {statut.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Type de visite </InputLabel>
              <Select
                value={visite.typeVisiteId}
                label="Type de visite"
                onChange={(e) =>
                  setVisite({ ...visite, typeVisiteId: e.target.value })
                }
              >
                {typeVisites.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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

export default EditVisite;
