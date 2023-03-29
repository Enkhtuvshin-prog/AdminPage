import { useContext, useState } from 'react';
import axios from 'axios';

// @mui
import { Grid,  Box, Card, Link, Typography, Stack, IconButton, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';
import TravelModal from '../../../components/updateCom/travelModal';
import { CategoryContext } from '../../../context/categoryContext';


// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

export default function ShopProductCard({ travels,  open, setOpen, handleClose,  }) {
  const { changeState, setChangeState, setIsEdit, setSelectTravel } = useContext(CategoryContext);


  const deleteTravel = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/travel/${id}`);
      console.log('deleteTr', res.data.travel);
      setChangeState(!changeState);
    } catch (err) {
      console.log('ERROR==', err);
    }
  };

  return (
    <>
     <TravelModal 
      open={open} handleClose={handleClose}
      />
    <Grid container spacing={3}>
      {travels.map((travel) => (
        <Grid key={travel.id} item xs={12} sm={6} md={3}>
          <Card>
     
      <Box>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          <StyledProductImg alt={travel.title} src={travel.images} />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Box>
            <Link color="inherit" underline="hover">
              <Typography variant="h4" noWrap>
                {travel.title}
              </Typography>
            </Link>
            <Typography>{travel.detail}</Typography>
            <Typography>Day: {travel.day}</Typography>
          </Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {/* <ColorPreview colors={colors} /> */}
            <Typography variant="subtitle1">
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }}
              >
                {/* {priceSale && fCurrency(priceSale)} */}
              </Typography>
              &nbsp;
              {fCurrency(travel.price)}
            </Typography>
            <Box>
              <IconButton
                size="large"
                color="inherit"
                onClick={() => {
                  setOpen(true)
                  setIsEdit(true);
                  setSelectTravel(travel);
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
              </IconButton>
              <IconButton size="large" color="inherit" onClick={() => deleteTravel(travel._id)}>
                <Iconify icon={'eva:trash-fill'} />
              </IconButton>
            </Box>
            
          </Stack>
        
        </Stack>
        
      </Box>
    </Card>

          
        </Grid>
      ))}
    </Grid>
    
    
    </>
  );
}
