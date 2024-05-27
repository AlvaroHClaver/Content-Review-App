import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import { ListItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import LoadingButton from "@mui/lab/LoadingButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddShowDialog({ updateList, list }) {
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = useState();
  const [isLoading, setLoading] = useState(false);

  async function addBook() {
    try {
      setLoading(true);
      const response = await axios.post(`/tvshow`, {
        cast: show.cast,
        title: show.title,
        release: show.release,
        season: show.season,
        imgPath: show.imgPath,
        country: show.country,
        director: show.director,
      });
      if (response.status === 201) {
        updateList([...list, response.data]);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        endIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Add Show
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Create New TV Show
            </Typography>
            <LoadingButton
              variant="contained"
              loadingIndicator="Loading…"
              loading={isLoading ? true : false}
              onClick={() => addBook()}
            >
              Save
            </LoadingButton>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div>Title</div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "220px" }}
              onChange={(ev) => setShow({ ...show, title: ev.target.value })}
            />
          </ListItem>
          <Divider />
          <ListItem
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div>Director</div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "220px" }}
              onChange={(ev) => setShow({ ...show, director: ev.target.value })}
            />
          </ListItem>
          <Divider />
          <ListItem
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div>Release Date</div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "220px" }}
              onChange={(ev) => setShow({ ...show, release: ev.target.value })}
            />
          </ListItem>
          <Divider />
          <ListItem
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div>Image Link</div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "220px" }}
              onChange={(ev) => setShow({ ...show, imgPath: ev.target.value })}
            />
          </ListItem>
          <Divider />
          <ListItem
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div>Country</div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "220px" }}
              onChange={(ev) => setShow({ ...show, country: ev.target.value })}
            />
          </ListItem>
          <Divider />
          <ListItem
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div>Seasons</div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "220px" }}
              onChange={(ev) => setShow({ ...show, season: ev.target.value })}
            />
          </ListItem>
          <Divider />
          <ListItem
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div>Cast</div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "220px" }}
              onChange={(ev) => setShow({ ...show, cast: ev.target.value })}
            />
          </ListItem>
          <Divider />
        </List>
      </Dialog>
    </React.Fragment>
  );
}
