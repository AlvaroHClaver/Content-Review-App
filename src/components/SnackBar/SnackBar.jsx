import * as React from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";

export default function SnackBar() {
  // Inicializa o Snackbar como aberto
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box sx={{ width: 500, textAlign: "center" }}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        onClose={handleClose}
        message="Você já avaliou este título?"
        key={"bottomleft"}
        sx={{ "& .MuiSnackbarContent-root": { backgroundColor: "red" } }}
      />
    </Box>
  );
}
