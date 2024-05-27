import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import axios from "../../api/axiosConfig";

export default function ReviewDialog({ type, id, updateView }) {
  const [open, setOpen] = React.useState(false);
  const [rate, setRate] = React.useState();
  const [comment, setComment] = React.useState();

  async function postReview() {
    try {
      const response = await axios.post("/review", {
        score: rate,
        comment: comment,
        type: type,
        movies_id: type === "movie" ? id : "",
        book_id: type === "book" ? id : "",
        tvshow_id: type === "tvshow" ? id : "",
      });
      if (response.status === 201) {
        updateView({
          score: rate,
          comment: comment,
          user: {
            username: sessionStorage.getItem("username"),
            city: sessionStorage.getItem("city"),
          },
        });
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
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
      <Button variant="contained" onClick={handleClickOpen}>
        Add Review
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Rate this content! With this, you can interact with other users!
          </DialogContentText>
          <Rating
            value={rate}
            required
            onChange={(event, newValue) => {
              setRate(newValue);
            }}
            name="simple-controlled"
          />
          <TextField
            autoFocus
            multiline
            required
            id="name"
            name="text"
            label="Your Review"
            rows={4}
            fullWidth
            value={comment}
            onChange={(ev) => setComment(ev.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={() => postReview()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
