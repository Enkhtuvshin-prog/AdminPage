import * as React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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
    setCategoryImg(e.target.hhh);
  };
  const changeRating = (e) => {
    console.log('====', e.target);
    setCategoryRating(e.target.value);
  };

  const saveTravel = async () => {
    if (!edit) {
      console.log('post===');
      try {
        const res = await axios.post(`http://localhost:8000/travel`, {
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
    } else {
      console.log('put====', category._id);
      try {
        const res = await axios.put(`http://localhost:8000/travel/`, {
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
            <TextField id="standard-basic" label="Үнэ" variant="standard" onChange={changeRating} />
            <TextField id="standard-basic" label="Байршил" variant="standard" onChange={changeRating} />
            <TextField id="standard-basic" label="Өдөр" variant="standard" onChange={changeRating} />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value="Age"
                label="Age"
                // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <TextField id="standard-basic" label="Категория" variant="standard" onChange={changeRating} />

            {/* <Button onClick={createCategory}>Save</Button> */}
          </Box>

          <Button onClick={saveTravel}>Save</Button>
        </Box>
      </Modal>
    </div>
  );
}
