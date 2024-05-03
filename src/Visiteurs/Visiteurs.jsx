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

const Visiteurs = () => {
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
  const [visiteurToDelete, setVisiteurToDelete] = useState(null);

  const handleDeleteDialogOpen = (visiteur) => {
    setVisiteurToDelete(visiteur);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const cellStyle = {
    fontWeight: 800,
    fontSize: 15,
  };

  const handleDeleteVisiteur = async () => {
    if (visiteurToDelete) {
      try {
        await axios.delete(
          `http://localhost:5000/api/visiteurs/${visiteurToDelete.id}`
        );
        const newData = data.filter(
          (visiteur) => visiteur.id !== visiteurToDelete.id
        );
        setData(newData);
        setSnackbarMessage("Visiteur supprimé avec succès");
        setOpenSnackbar(true);
        setTimeout(() => setOpenSnackbar(false), 3000);
      } catch (error) {
        console.error("Erreur lors de la suppression du visiteur", error);
        setSnackbarMessage("Erreur lors de la suppression");
        setOpenSnackbar(true);
        setTimeout(() => setOpenSnackbar(false), 3000);
      }
      setOpenDeleteDialog(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/visiteurs");
      setData(response.data.$values);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);

  const handleClick = (event, visiteur) => {
    setSelected(visiteur.id === selected ? null : visiteur.id);
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
            Êtes-vous sûr de vouloir supprimer ce visiteur ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeleteVisiteur} color="primary" autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        message={snackbarMessage}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
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
          <Link to="/visiteurs/add" style={{ textDecoration: "none" }}>
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
            <Table>
              <TableHead
                style={{ backgroundColor: "rgba(204, 204, 204, 0.15)" }}
              >
                <TableRow>
                  <TableCell style={cellStyle}>Nom</TableCell>
                  <TableCell style={cellStyle}>Prénom</TableCell>
                  <TableCell style={cellStyle}>Téléphone</TableCell>
                  <TableCell style={cellStyle}>Email</TableCell>
                  <TableCell style={cellStyle}>Type de Visiteur</TableCell>
                  <TableCell style={cellStyle}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((visiteur) => (
                    <TableRow
                      key={visiteur.id}
                      hover
                      onClick={(event) => handleClick(event, visiteur)}
                      selected={selected === visiteur.id}
                    >
                      <TableCell>{visiteur.nom}</TableCell>
                      <TableCell>{visiteur.prenom}</TableCell>
                      <TableCell>{visiteur.telphone}</TableCell>
                      <TableCell>{visiteur.email}</TableCell>
                      <TableCell>{visiteur.typeVisiteurId}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <Link to={`/visiteurs/edit/${visiteur.id}`}>
                            <IconButton
                              aria-label="edit"
                              style={{ color: "#3f51b5" }}
                            >
                              {" "}
                              <EditIcon />
                            </IconButton>
                          </Link>
                        </Tooltip>
                        {/* <Tooltip title="Delete">
                          <IconButton
                            aria-label="delete"
                            style={{ color: "#f44336" }}
                            onClick={() => handleDeleteDialogOpen(person)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip> */}
                      </TableCell>
                    </TableRow>
                  ))}
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

export default Visiteurs;
