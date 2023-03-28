import PropTypes from 'prop-types';
import { useContext } from 'react';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';
import { CategoryContext } from '../../../context/categoryContext';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  travels: PropTypes.array.isRequired,
};

export default function ProductList({ open, handleClose, handleOpen }) {
  const { travels } = useContext(CategoryContext);
  return (
    <Grid container spacing={3}>
      {travels.map((travel) => (
        <Grid key={travel.id} item xs={12} sm={6} md={3}>
          <ShopProductCard travel={travel} open={open} handleClose={handleClose} handleOpen={handleOpen} />
        </Grid>
      ))}
    </Grid>
  );
}
