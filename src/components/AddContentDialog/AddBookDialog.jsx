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

export default function AddBookDialog({ updateBookList, books }) {
  const [open, setOpen] = React.useState(false);
  const [book, setBook] = useState();
  const [isLoading, setLoading] = useState(false);

  async function addBook() {
    try {
      setLoading(true);
      const response = await axios.post(`/book`, {
        author: book.author,
        title: book.title,
        release: book.release,
        pages: book.pages,
        imgPath: book.imgPath,
        country: book.country,
        publisher: book.publisher,
      });
      if (response.status === 201) {
        updateBookList([...books, response.data]);
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
        Add Book
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
              Create New Book
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
              onChange={(ev) => setBook({ ...book, title: ev.target.value })}
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
            <div>Author</div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "220px" }}
              onChange={(ev) => setBook({ ...book, author: ev.target.value })}
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
              onChange={(ev) => setBook({ ...book, release: ev.target.value })}
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
              onChange={(ev) => setBook({ ...book, imgPath: ev.target.value })}
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
              onChange={(ev) => setBook({ ...book, country: ev.target.value })}
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
            <div>Pages</div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "220px" }}
              onChange={(ev) => setBook({ ...book, pages: ev.target.value })}
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
            <div>Publisher</div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "220px" }}
              onChange={(ev) =>
                setBook({ ...book, publisher: ev.target.value })
              }
            />
          </ListItem>
          <Divider />
        </List>
      </Dialog>
    </React.Fragment>
  );
}
