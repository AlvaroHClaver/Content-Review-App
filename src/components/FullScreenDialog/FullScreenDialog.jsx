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
import EditIcon from "@mui/icons-material/Edit";
import { ListItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import LoadingButton from "@mui/lab/LoadingButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ selectedMovie, setNewMovie }) {
  const [open, setOpen] = React.useState(false);
  const [movie, setMovie] = useState();
  const [isLoading, setLoading] = useState(false);

  async function updateMovie() {
    try {
      setLoading(true);
      const response = await axios.put(`/movie/${movie.id}`, {
        director: movie.director,
        title: movie.title,
        release: movie.release,
        genre: movie.genre,
        imgPath: movie.imgPath,
        country: movie.country,
        cast: movie.cast,
      });
      if (response.status === 200) {
        setNewMovie(movie);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setMovie(selectedMovie);
  }, [selectedMovie]);

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
        endIcon={<EditIcon />}
        onClick={handleClickOpen}
      >
        Edit
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar style={{ backgroundColor: "#FC4747" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Movie
            </Typography>
            <LoadingButton
              variant="contained"
              loadingIndicator="Loading…"
              loading={isLoading ? true : false}
              onClick={() => updateMovie()}
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
              value={movie?.title ? movie.title : ""}
              onChange={(ev) => setMovie({ ...movie, title: ev.target.value })}
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
              value={movie?.director ? movie.director : ""}
              onChange={(ev) =>
                setMovie({ ...movie, director: ev.target.value })
              }
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
              value={movie?.release ? movie.release : ""}
              onChange={(ev) =>
                setMovie({ ...movie, release: ev.target.value })
              }
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
              value={movie?.imgPath ? movie.imgPath : ""}
              onChange={(ev) =>
                setMovie({ ...movie, imgPath: ev.target.value })
              }
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
              value={movie?.country ? movie.country : ""}
              onChange={(ev) =>
                setMovie({ ...movie, country: ev.target.value })
              }
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
            <div>Genre</div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "220px" }}
              value={movie?.genre ? movie.genre : ""}
              onChange={(ev) => setMovie({ ...movie, genre: ev.target.value })}
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
              value={movie?.cast}
              onChange={(ev) => setMovie({ ...movie, cast: ev.target.value })}
            />
          </ListItem>
          <Divider />
        </List>
      </Dialog>
    </React.Fragment>
  );
}
