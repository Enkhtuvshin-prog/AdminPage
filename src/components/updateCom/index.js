import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState, useContext } from 'react';
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
  const { category, setCategory, isEdit, changeState, setChangeState } = useContext(CategoryContext);
  const [isLoading, setIsLoading] = useState(false);
  const [newCat, setNewCat] = useState({
    title: '',
    description: '',
    categoryImg: '',
    categoryRating: '',
  });

  const saveCategory = async () => {
    if (!isLoading) {
      try {
        if (!isEdit) {
          await axios.post(`http://localhost:8000/category`, newCat);
        } else {
          await axios.put(`http://localhost:8000/category/${category._id}`, category);
        }
        setChangeState(!changeState);
      } catch (error) {
        console.log('err', error);
      } finally {
        handleClose();
      }
    }
  };
  const getImgUrl = async (e) => {
    try {
      setIsLoading(true);
      const bodyData = new FormData();
      bodyData.append('image', e.target.files[0]);
      const res = await axios.post(`http://localhost:8000/upload`, bodyData);
      console.log('===', res.data.imgUrl);

      if (!isEdit) {
        setNewCat({ ...newCat, categoryImg: res.data.imgUrl });
      } else {
        setCategory({ ...category, categoryImg: res.data.imgUrl });
      }
    } catch (err) {
      console.log('ERROR', err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (e) => {
    if (!isEdit) {
      setNewCat({ ...newCat, [e.target.name]: e.target.value });
    } else {
      setCategory({ ...category, [e.target.name]: e.target.value });
    }
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
            {!isEdit ? 'New' : 'Update'} Category
            {/* New category */}
          </Typography>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '40ch' },
            }}
            noValidate
            // autoComplete="off"
          >
            <TextField
              id="standard-basic"
              label="Нэр"
              variant="standard"
              name="title"
              value={!isEdit ? newCat.title : category.title}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Description"
              variant="standard"
              name="description"
              value={!isEdit ? newCat.description : category.description}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              type="file"
              label="Зураг"
              name="categoryImg"
              variant="standard"
              value={!isEdit ? newCat.categoryImg : category.categoryImg}
              onChange={getImgUrl}
            />
            <TextField
              id="standard-basic"
              label="Үнэлгээ"
              name="categoryRating"
              variant="standard"
              value={!isEdit ? newCat.categoryRating : category.categoryRating}
              onChange={handleChange}
            />
          </Box>
          <Button onClick={saveCategory}>Save</Button>
        </Box>
      </Modal>
    </div>
  );
}
