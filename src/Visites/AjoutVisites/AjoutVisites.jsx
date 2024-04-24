import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
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
import axios from "axios";

const AjoutVisites = () => {
  const navigate = useNavigate();
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

  // Effect hook to fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const personnelRes = await axios.get(
          "http://localhost:5000/api/Personnel"
        );
        const raisonsRes = await axios.get(
          "http://localhost:5000/api/RaisonVisites"
        );
        console.log(raisonsRes.data);
        const statutsRes = await axios.get("http://localhost:5000/api/Statuts");
        console.log(statutsRes.data);
        const typeVisitesRes = await axios.get(
          "http://localhost:5000/api/TypeVisites"
        );
        const typeVisiteursRes = await axios.get(
          "http://localhost:5000/api/TypeVisiteurs"
        );
        setPersonnel(personnelRes.data.$values);
        setRaisonsVisites(raisonsRes.data.$values);
        setStatuts(statutsRes.data);
        setTypeVisites(typeVisitesRes.data.$values);
        setTypeVisiteurs(typeVisiteursRes.data.$values);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(visite);
    try {
      await axios.post(`http://localhost:5000/api/Visites`, visite);
      navigate(`/visites?toastMessage=Opération réussie`);
    } catch (error) {
      console.error("Error adding visite:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVisite((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (date, fieldName) => {
    setVisite((prevState) => ({ ...prevState, [fieldName]: date }));
  };

  return (
    <Paper style={{ padding: "16px", margin: "auto", maxWidth: "600px" }}>
      <Typography variant="h6" style={{ marginBottom: "20px" }}>
        Ajout de Visite
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
              <Select
                value={visite.statutId}
                label="Statut de la visite"
                onChange={(e) =>
                  setVisite({ ...visite, statutId: e.target.value })
                }
              >
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

export default AjoutVisites;
