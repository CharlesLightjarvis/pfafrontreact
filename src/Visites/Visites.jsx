import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Tooltip,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Visites = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const location = useLocation();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [visiteToDelete, setVisiteToDelete] = useState(null);

  const handleDeleteDialogOpen = (visite) => {
    setVisiteToDelete(visite);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteVisite = async () => {
    if (visiteToDelete) {
      try {
        await axios.delete(
          `http://localhost:5000/api/Visites/${visiteToDelete.uid}`
        );
        const newData = data.filter(
          (visite) => visite.uid !== visiteToDelete.uid
        );
        setData(newData);
        setSnackbarMessage("Visite supprimée avec succès");
        setOpenSnackbar(true);
        setTimeout(() => setOpenSnackbar(false), 3000);
      } catch (error) {
        console.error("Erreur lors de la suppression de la visite", error);
        setSnackbarMessage("Erreur lors de la suppression");
        setOpenSnackbar(true);
        setTimeout(() => setOpenSnackbar(false), 3000);
      }
      setOpenDeleteDialog(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/Visites");
      setData(response.data.data.$values);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const toastMessage = searchParams.get("toastMessage");
    if (toastMessage) {
      setSnackbarMessage(toastMessage);
      setOpenSnackbar(true);
      setTimeout(() => {
        setOpenSnackbar(false);
        navigate(location.pathname, { replace: true });
      }, 3000);
    }
    fetchData();
  }, [location, navigate]);

  const handleClick = (event, visite) => {
    setSelected(visite.uid === selected ? null : visite.uid);
  };

  const handleEmptyClick = (event) => {
    if (event.target.tagName === "TABLE") {
      setSelected(null);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMoreDetails = (event) => {
    console.log(event.target.value);
  };

  const cellStyle = {
    fontWeight: 800,
    fontSize: 15,
  };

  const successSnackbarStyle = {
    success: {
      backgroundColor: "green", // Couleur verte pour les messages de succès
    },
  };

  return (
    <div>
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmer la suppression"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir supprimer cette visite ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeleteVisite} color="primary" autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        message={snackbarMessage}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position en haut à droite
        ContentProps={{
          style: successSnackbarStyle.success, // Appliquer le style de succès
        }}
      />

      {loading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "250px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <Link to="/visites/add" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginBottom: "15px" }}
            >
              Ajouter
            </Button>
          </Link>
          <TableContainer
            component={Paper}
            style={{
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
            }}
          >
            <Table onClick={handleEmptyClick}>
              <TableHead
                style={{ backgroundColor: "rgba(204, 204, 204, 0.15)" }}
              >
                <TableRow>
                  <TableCell style={cellStyle}>Date Heure Début</TableCell>
                  <TableCell style={cellStyle}>Date Heure Fin</TableCell>
                  <TableCell style={cellStyle}>Personnel</TableCell>

                  <TableCell style={cellStyle}>Raison Visite</TableCell>
                  <TableCell style={cellStyle}>Statut</TableCell>
                  <TableCell style={cellStyle}>Type Visite</TableCell>
                  <TableCell style={cellStyle}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((visite) => {
                    const isSelected = selected === visite.uid;
                    return (
                      <TableRow
                        key={visite.uid}
                        hover
                        onClick={(event) => handleClick(event, visite)}
                        selected={isSelected}
                      >
                        <TableCell>{visite.dateHeureDebut}</TableCell>
                        <TableCell>{visite.dateHeureFin}</TableCell>
                        <TableCell>
                          {visite.personnelNom + " " + visite.personnelPrenom}
                        </TableCell>

                        <TableCell>{visite.raisonVisiteNom}</TableCell>
                        <TableCell>
                          <span
                            style={{
                              backgroundColor:
                                visite.statutNom === "En cours"
                                  ? "purple"
                                  : visite.statutNom === "Clôturée"
                                  ? "#4caf50"
                                  : visite.statutNom === "Annulée"
                                  ? "#f44336"
                                  : null,
                              color: "white", // Couleur du texte
                              padding: "5px 5px", // Marge intérieure pour améliorer l'apparence
                              borderRadius: "5px", // Bordure arrondie pour un meilleur aspect
                              display: "inline-block", // Affichage en ligne pour l'élément span
                            }}
                          >
                            {visite.statutNom}
                          </span>
                        </TableCell>

                        <TableCell>
                          <span
                            style={{
                              backgroundColor:
                                visite.typeVisiteNom === "Prévue"
                                  ? "#2196f3"
                                  : visite.typeVisiteNom === "Non-Prévue"
                                  ? "#e91e63"
                                  : null,
                              color: "white", // Couleur du texte
                              padding: "5px 5px", // Marge intérieure pour améliorer l'apparence
                              borderRadius: "5px", // Bordure arrondie pour un meilleur aspect
                              display: "inline-block", // Affichage en ligne pour l'élément span
                            }}
                          >
                            {visite.typeVisiteNom}
                          </span>
                        </TableCell>

                        <TableCell>
                          <Tooltip title="Edit">
                            <Link to={`/visites/edit/${visite.uid}`}>
                              <IconButton
                                aria-label="edit"
                                style={{ color: "#3f51b5" }}
                              >
                                <EditIcon />
                              </IconButton>
                            </Link>
                          </Tooltip>

                          <Tooltip title="Details">
                            <Link to={`/visites/show/${visite.uid}`}>
                              <IconButton
                                aria-label="moreDetails"
                                style={{ color: "grey" }}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </Link>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default Visites;
