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
  CircularProgress, // Importer CircularProgress depuis Material-UI
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";

const Personnels = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State pour gérer le chargement
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const location = useLocation();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [personToDelete, setPersonToDelete] = useState(null);

  const handleDeleteDialogOpen = (person) => {
    setPersonToDelete(person);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeletePerson = async () => {
    if (personToDelete) {
      try {
        await axios.delete(
          `http://localhost:5000/api/Personnel/${personToDelete.id}`
        );
        const newData = data.filter(
          (person) => person.id !== personToDelete.id
        );
        setData(newData);
        setSnackbarMessage("Personnel supprimé avec succès");
        setOpenSnackbar(true);
        setTimeout(() => setOpenSnackbar(false), 3000);
      } catch (error) {
        console.error("Erreur lors de la suppression du personnel", error);
        setSnackbarMessage("Erreur lors de la suppression");
        setOpenSnackbar(true);
        setTimeout(() => setOpenSnackbar(false), 3000);
      }
      setOpenDeleteDialog(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/Personnel");
      // Vérifiez si la réponse contient la propriété $values et c'est un tableau
      if (response.data && Array.isArray(response.data.$values)) {
        setData(response.data.$values);
      } else {
        console.error(
          "Data received is not in expected format:",
          response.data
        );
        setData([]); // Mettez à jour avec un tableau vide si les données ne sont pas au format attendu
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]); // Mettez à jour avec un tableau vide en cas d'erreur
    } finally {
      setLoading(false); // Mettre fin au chargement une fois que les données sont récupérées
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
        // Nettoyer l'URL ici après affichage du snackbar
        navigate(location.pathname, { replace: true }); // Cela supprime les paramètres de recherche
      }, 3000);
    }
    fetchData();
  }, [location, navigate]);

  const handleClick = (event, person) => {
    setSelected(person.id === selected ? null : person.id);
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
            Êtes-vous sûr de vouloir supprimer ce personnel ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeletePerson} color="primary" autoFocus>
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
        // Afficher CircularProgress si les données sont en cours de chargement
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
          <Link to="/personnels/add" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginBottom: "15px" }}
            >
              Ajout personnel
            </Button>
          </Link>
          <TableContainer
            component={Paper}
            style={{
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px", // Utilisation de la notation camelCase pour boxShadow
            }}
          >
            <Table onClick={handleEmptyClick}>
              <TableHead
                style={{ backgroundColor: "rgba(204, 204, 204, 0.15)" }}
              >
                <TableRow>
                  <TableCell style={cellStyle}>Nom</TableCell>
                  <TableCell style={cellStyle}>Prénom</TableCell>
                  <TableCell style={cellStyle}>Téléphone</TableCell>
                  <TableCell style={cellStyle}>Poste</TableCell>
                  <TableCell style={cellStyle}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((person) => {
                    const isSelected = selected === person.id;
                    return (
                      <TableRow
                        key={person.id}
                        hover
                        onClick={(event) => handleClick(event, person)}
                        selected={isSelected}
                      >
                        <TableCell>{person.nom}</TableCell>
                        <TableCell>{person.prenom}</TableCell>
                        <TableCell>{person.telephone}</TableCell>
                        <TableCell>{person.poste}</TableCell>

                        <TableCell>
                          <Tooltip title="Edit">
                            <Link to={`/personnels/edit/${person.id}`}>
                              <IconButton
                                aria-label="edit"
                                style={{ color: "#3f51b5" }}
                              >
                                <EditIcon />
                              </IconButton>
                            </Link>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              aria-label="delete"
                              style={{ color: "#f44336" }}
                              onClick={() => handleDeleteDialogOpen(person)}
                            >
                              <DeleteIcon />
                            </IconButton>
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

export default Personnels;
