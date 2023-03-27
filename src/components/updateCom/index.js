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

export default function BasicModal({ open, handleClose, category, changeState, setChangeState, isNew, edit }) {
  const [title, setTitle] = useState();
  const [description, setDesc] = React.useState();
  const [categoryImg, setCategoryImg] = React.useState();
  const [categoryRating, setCategoryRating] = useState();

  const changeTitle = (e) => {
    console.log('====', e.target.value);
    setTitle(e.target.value);
  };
  const changeDesc = (e) => {
    console.log('====', e.target.value);
    setDesc(e.target.value);
  };

  const changeImage = (e) => {
    console.log('====', e.target.value);
    setCategoryImg(e.target.value);
  };
  const changeRating = (e) => {
    console.log('====', e.target);
    setCategoryRating(e.target.value);
  };

  const saveCategory = async () => {
    if (!edit) {
      console.log('post===');
      try {
        const res = await axios.post(`http://localhost:8000/category`, {
          title,
          description,
          categoryImg,
          categoryRating,
        });
        setChangeState(!changeState);
      } catch (error) {
        console.log('err', error);
      }
    } else {
      console.log('put====', category._id);
      try {
        const res = await axios.put(`http://localhost:8000/category/${category._id}`, {
          title,
          description,
          categoryImg,
          categoryRating,
        });
        setChangeState(!changeState);
      } catch (error) {
        console.log('err', error);
      }
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
            {isNew ? 'New' : 'Update'} Category
            {/* New category */}
          </Typography>
          {isNew ? (
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
                variant="standard"
                // onChange={changeTitle}
              />
              <TextField id="standard-basic" label="Тайлбар" variant="standard" onChange={changeDesc} />
              <TextField id="standard-basic" label="Зураг" variant="standard" onChange={changeImage} />
              <TextField id="standard-basic" label="Үнэлгээ" variant="standard" onChange={changeRating} />
              {/* <Button onClick={createCategory}>Save</Button> */}
            </Box>
          ) : (
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '40ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                // value={title}
                id="standard-basic"
                label="Нэр"
                variant="standard"
                onChange={changeTitle}
                // defaultValue={category.title}
                // helperText="Incorrect entry."
              />
              <TextField
                // value={description}
                id="standard-basic"
                label="Тайлбар"
                variant="standard"
                onChange={changeDesc}
                // defaultValue={category.description}
                // helperText="Incorrect entry."
              />
              <TextField
                // value={categoryImg}
                id="standard-basic"
                label="Зураг"
                variant="standard"
                onChange={changeImage}
                // defaultValue={category.categoryImg}
                // helperText="Incorrect entry."
              />
              <TextField
                // value={categoryRating}
                id="standard-basic"
                label="Үнэлгээ"
                variant="standard"
                onChange={changeRating}
                // defaultValue={category.categoryRating}

                // defaultValue={category.categoryRating}
                // helperText="Incorrect entry."
              />
              {/* <Button onClick={updateCategory}>Save</Button> */}
            </Box>
          )}
          <Button onClick={saveCategory}>Save</Button>
        </Box>
      </Modal>
    </div>
  );
}
