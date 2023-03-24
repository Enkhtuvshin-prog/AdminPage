import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({id, getCategory}) {
  const [title, setTitle] = React.useState("");
  const [img, setImage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("error");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };
  const changeImage = (e) => {
    setImage(e.target.value);
  };
  const updateCategory = async ( id) => {
    console.log("====",  id);
    try {
      const res = await axios.post(`http://localhost:8000/category/${id}`);
      getCategory()
      // setMessage(res.data.message);
    } catch (error) {
      console.log("err", error);
    }
  };
  return (
    <div>
      <Button onClick={handleOpen}>add</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Category
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "40ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              label="Нэр"
              variant="standard"
              onChange={changeTitle}
            />
            <TextField
              id="standard-basic"
              label="Тайлбар"
              variant="standard"
              onChange={changeTitle}
            />
            <TextField
              id="standard-basic"
              label="Зураг"
              variant="standard"
              onChange={changeImage}
            />
          </Box>
           <Button  onClick={updateCategory} >Update</Button> 
        </Box>
      </Modal>
    </div>
  );
}