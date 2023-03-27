import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  travels: PropTypes.array.isRequired,
};

export default function ProductList({ travels, changeState, setChangeState }) {
  return (
    <Grid container spacing={3} >
      {travels.map((travel) => (
        <Grid key={travel.id} item xs={12} sm={6} md={3}>
          <ShopProductCard travel={travel} changeState={changeState} setChangeState={setChangeState} />
        </Grid>
      ))}
    </Grid>
  );
}
