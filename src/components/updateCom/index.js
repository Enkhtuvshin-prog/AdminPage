import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState } from 'react';

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

export default function BasicModal({ open, handleClose, category, setCategory, changeState, setChangeState, isNew, edit }) {
console.log("bbbbcat", category);
  const saveCategory = async () => {
    if (!edit) {
      console.log('post===');
      try {
        const res = await axios.post(`http://localhost:8000/category`, category);
        setChangeState(!changeState);
      } catch (error) {
        console.log('err', error);
      }
    } else {
      console.log('put====', category._id);
      try {
        const res = await axios.put(`http://localhost:8000/category/${category._id}`,  category);
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
                name='title'
              />
              <TextField id="standard-basic" label="Тайлбар" name='desription'  variant="standard" />
              <TextField id="standard-basic" label="Зураг" name='categoryImg' variant="standard"  />
              <TextField id="standard-basic" label="Үнэлгээ" name='categoryRating' variant="standard"  />
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
                id="standard-basic"
                label="Нэр"
                variant="standard"
                name='title'
                defaultValue={category.title}
                onChange={(e)=>setCategory({...category, [e.target.name]: e.target.value })}
              />
              <TextField
                id="standard-basic"
                label="Тайлбар"
                variant="standard"
                name='description'
                defaultValue={category.description}
                onChange={(e)=>setCategory({...category, [e.target.name]: e.target.value })}

              />
              <TextField
                id="standard-basic"
                label="Зураг"
                variant="standard"
                name='categoryImg'
                defaultValue={category.categoryImg}
                onChange={(e)=>setCategory({...category, [e.target.name]: e.target.value })}

              />
              <TextField
                id="standard-basic"
                label="Үнэлгээ"
                variant="standard"
                name='categoryRating'
                defaultValue={category.categoryRating}
                onChange={(e)=>setCategory({...category, [e.target.name]: e.target.value })}/>

            </Box>
          )}
          <Button onClick={saveCategory}>Save</Button>
        </Box>
      </Modal>
    </div>
  );
}
