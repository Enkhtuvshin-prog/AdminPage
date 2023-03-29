import * as React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState, useContext } from 'react';
import Iconify from '../iconify';
import { CategoryContext } from '../../context/categoryContext';

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

export default function BasicModal({ open, handleClose }) {
  const { selectTravel, setSelectTravel, changeState, setChangeState, isEdit, filteredCategory } =
    useContext(CategoryContext);
  // console.log('===filtCat', filteredCategory);
  const [newTravel, setNewTravel] = useState({
    title: '',
    images: 'url',
    detail: '',
    price: '',
    location: '',
    day: '',
    category: '',
  });

  const handleChange = (e) => {
    if (!isEdit) {
      setNewTravel({ ...newTravel, [e.target.name]: e.target.value });
    } else {
      setSelectTravel({ ...selectTravel, [e.target.name]: e.target.value });
    }
  };

  const saveTravel = async () => {
    try {
      if (!isEdit) {
         await axios.post(`http://localhost:8000/travel`, newTravel);
      } else {
         await axios.put(`http://localhost:8000/travel/${selectTravel._id}`, selectTravel);
      }
      setChangeState(!changeState);
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
            {!isEdit ? 'New Travel' : 'Update Travel'}
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
              label="Нэр"
              name="title"
              variant="standard"
              defaultValue={!isEdit ? newTravel.title : selectTravel.title}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Зураг"
              name="images"
              variant="standard"
              defaultValue={!isEdit ? newTravel.images : selectTravel.images}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Тайлбар"
              name="detail"
              variant="standard"
              defaultValue={!isEdit ? newTravel.detail : selectTravel.detail}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Үнэ"
              name="price"
              variant="standard"
              defaultValue={!isEdit ? newTravel.price : selectTravel.price}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Байршил"
              name="location"
              variant="standard"
              defaultValue={!isEdit ? newTravel.location : selectTravel.location}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Өдөр"
              name="day"
              variant="standard"
              defaultValue={!isEdit ? newTravel.day : selectTravel.day}
              onChange={handleChange}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Категория</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Категория"
                name="category"
                defaultValue={!isEdit ? newTravel.day : selectTravel.day}
                onChange={handleChange}
              >
                {filteredCategory.map((item) => (
                  <MenuItem value={item._id}>{item.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button onClick={saveTravel}>Save</Button>
        </Box>
      </Modal>
    </div>
  );
}
