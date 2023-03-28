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

export default function BasicModal({ open, handleClose, travelOption, changeState, setChangeState,  setTravelOption , isEdit }) {
  const saveTravel = async () => {
   if(!isEdit){
      console.log('post===');
      try {
        const res = await axios.post(`http://localhost:8000/travel`, {travelOption});
        console.log(res.data.travel);
        setChangeState(!changeState);
        // setMessage(res.data.message);
      } catch (error) {
        console.log('err', error);
      }
    
    } else {
      console.log('put====', travelOption._id);
      try {
        const res = await axios.put(`http://localhost:8000/travel/${travelOption._id}`, travelOption);
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
            {!isEdit ? "New Travel" : "Update Travel" }
          </Typography>
    
        {
              !isEdit ?   <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '40ch' },
              }}
              noValidate
              autoComplete="off"
            >
              
              
               <TextField id="standard-basic" label="Нэр" name='title' variant="standard"   onChange={(e) => {
                setTravelOption({ ...travelOption, [e.target.name]: e.target.value });
              }} />
              <TextField id="standard-basic" label="Зураг" name='images' variant="standard"  onChange={(e)=>setTravelOption({...travelOption, [e.target.name]: e.target.value })} />
              <TextField id="standard-basic" label="Тайлбар" name='detail' variant="standard" onChange={(e)=>setTravelOption({...travelOption, [e.target.name]: e.target.value })} />
              <TextField id="standard-basic" label="Үнэ"  name='price' variant="standard"  onChange={(e)=>setTravelOption({...travelOption, [e.target.name]: e.target.value })} />
              <TextField id="standard-basic" label="Байршил" name='location' variant="standard"    onChange={(e)=>setTravelOption({...travelOption, [e.target.name]: e.target.value })}/>
              <TextField id="standard-basic" label="Өдөр" name='day' variant="standard" onChange={(e)=>setTravelOption({...travelOption, [e.target.name]: e.target.value })}  />
              <TextField id="standard-basic" label="Категория" name='category' variant="standard"   onChange={(e)=>setTravelOption({...travelOption, [e.target.name]: e.target.value })} />
            </Box> : <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '40ch' },
            }}
            noValidate
            autoComplete="off"
          >
            
            
             <TextField id="standard-basic" label="Нэр" name='title' variant="standard" defaultValue={travelOption.title}  onChange={(e) => {
              setTravelOption({ ...travelOption, [e.target.name]: e.target.value });
            }} />
            <TextField id="standard-basic" label="Зураг" name='images' variant="standard" defaultValue={travelOption.images} onChange={(e)=>setTravelOption({...travelOption, [e.target.name]: e.target.value })} />
            <TextField id="standard-basic" label="Тайлбар" name='detail' variant="standard" defaultValue={travelOption.detail} onChange={(e)=>setTravelOption({...travelOption, [e.target.name]: e.target.value })} />
            <TextField id="standard-basic" label="Үнэ"  name='price' variant="standard" defaultValue={travelOption.price} onChange={(e)=>setTravelOption({...travelOption, [e.target.name]: e.target.value })} />
            <TextField id="standard-basic" label="Байршил" name='location' variant="standard"  defaultValue={travelOption.location}  onChange={(e)=>setTravelOption({...travelOption, [e.target.name]: e.target.value })}/>
            <TextField id="standard-basic" label="Өдөр" name='day' variant="standard" defaultValue={travelOption.day} onChange={(e)=>setTravelOption({...travelOption, [e.target.name]: e.target.value })}  />
            <TextField id="standard-basic" label="Категория" name='category' variant="standard"   onChange={(e)=>setTravelOption({...travelOption, [e.target.name]: e.target.value })} />
          </Box>

      }
          <Button onClick={saveTravel}>Save</Button>
        </Box> 
      </Modal>
    </div>
  );
}
