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

export default function ShowDialog({ selected, setNew }) {
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = useState();
  const [isLoading, setLoading] = useState(false);

  async function updateShow() {
    try {
      setLoading(true);
      const response = await axios.put(`/tvshow/${show.id}`, {
        director: show.director,
        title: show.title,
        release: show.release,
        season: show.season,
        imgPath: show.imgPath,
        country: show.country,
        cast: show.cast,
      });
      if (response.status === 200) {
        setNew(show);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setShow(selected);
  }, [selected]);

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
              Tv Show
            </Typography>
            <LoadingButton
              variant="contained"
              loadingIndicator="Loading…"
              loading={isLoading ? true : false}
              onClick={() => updateShow()}
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
              value={show?.title ? show.title : ""}
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
              value={show?.director ? show.director : ""}
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
              value={show?.release ? show.release : ""}
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
              value={show?.imgPath ? show.imgPath : ""}
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
              value={show?.country ? show.country : ""}
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
            <div>Season</div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "220px" }}
              value={show?.season ? show.season : ""}
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
              value={show?.cast}
              onChange={(ev) => setShow({ ...show, cast: ev.target.value })}
            />
          </ListItem>
          <Divider />
        </List>
      </Dialog>
    </React.Fragment>
  );
}
