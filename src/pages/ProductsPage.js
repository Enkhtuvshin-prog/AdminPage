import { Helmet } from 'react-helmet-async';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
// @mui
import { Button, Container, IconButton, Stack, Typography } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import Iconify from '../components/iconify';
// mock
import PRODUCTS from '../_mock/products';


// ----------------------------------------------------------------------

export default function ProductsPage() {

  const [openFilter, setOpenFilter] = useState(false);
  const [travel, setTravel] = useState([]);
  const [changeState, setChangeState] = useState(null);
  const [isEdit, setIsEdit] = useState(null);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const allTravels = async()=>{
    try{
      const res = await axios.get(`http://localhost:8000/travel`);
      console.log("=====", res.data.travel);
      setTravel(res.data.travel);
    }catch(err){
      console.log("ERROR", err);
    }
  }

  useEffect(()=>{
    allTravels()
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
          <Button variant="contained" 
          onClick={()=> setIsEdit(false)} 
          startIcon={<Iconify icon="eva:plus-fill"  />}  
           >
            New Travel
          </Button>
          <ProductCartWidget/>
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
        <ProductList travels={travel} changeState={changeState} setChangeState={setChangeState} isEdit={isEdit} setIsEdit={setIsEdit} />
        {/* <ProductList products={PRODUCTS} /> */}
      </Container>

      
    </>
  );
}
