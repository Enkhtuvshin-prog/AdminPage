import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState } from 'react';
import Iconify from '../iconify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, handleClose, category, changeState, setChangeState }) {
  const [title, setTitle] = React.useState({});
  const [description, setDesc] = React.useState({});
  const [categoryImg, setCategoryImg] = React.useState({});

  const [categoryRating, setCategoryRating] = useState({});

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };
  const changeDesc = (e) => {
    setDesc(e.target.value);
  };

  const changeImage = (e) => {
    setCategoryImg(e.target.value);
  };
  const changeRating = (e) => {
    setCategoryRating(e.target.value);
  };
  const updateCategory = async () => {
    console.log('===dv', category._id);
    try {
      const res = await axios.put(`http://localhost:8000/category/${category._id}`, {
        title,
        description,
        categoryImg,
        categoryRating,
      });
      console.log(res.data.category);
      setChangeState(!changeState);
      // setMessage(res.data.message);
    } catch (error) {
      console.log('err', error);
    }
    handleClose();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {/* {isNew ? 'New' : 'Update'} Category */}
          </Typography>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '40ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              aria-readonly="false"
              onChange={changeTitle}
              // value={category.title}
            />
            <TextField
              id="standard-basic"
              label="description"
              variant="standard"
              aria-readonly="false"
              onChange={changeDesc}
              // value={category.description}
            />
            <TextField
              id="standard-basic"
              label=""
              variant="standard"
              aria-readonly="false"
              onChange={changeImage}
              // value={category.categoryImg}
            />
            <TextField
              id="standard-basic"
              label="Үнэлгээ"
              variant="standard"
              aria-readonly="false"
              onChange={changeRating}
              // value={category.categoryRating}
            />
          </Box>
          <Button onClick={updateCategory}>Save</Button>
        </Box>
      </Modal>
    </div>
  );
}
