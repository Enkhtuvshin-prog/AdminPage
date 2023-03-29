import { Helmet } from 'react-helmet-async';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
// @mui
import { Button, Container, IconButton, Stack, Typography, Grid } from '@mui/material';
// components
import { ProductSort, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import ShopProductCard from "../sections/@dashboard/products/ProductCard"
import Iconify from '../components/iconify';
import { CategoryContext } from '../context/categoryContext';

// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const { travels, setTravels, changeState,  setIsEdit} = useContext(CategoryContext);
  const [openFilter, setOpenFilter] = useState(false);

  const [open, setOpen] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const allTravels = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/travel`);
      console.log('=====', res.data.travel);
      setTravels(res.data.travel);
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  useEffect(() => {
    allTravels();
  }, [changeState]);

  return (
    <>
      <Helmet>
        <title> Travel </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Travel
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setIsEdit(false);
              setOpen(true)
            }}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Travel
          </Button>
          <ProductCartWidget />
        </Stack>
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
       
          <ShopProductCard  travels={travels}  open={open} handleClose={handleClose} setOpen={setOpen}
          />
       
      </Container>
    </>
  );
}
