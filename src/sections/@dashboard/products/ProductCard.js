import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import axios from 'axios';

// @mui
import { Box, Card, Link, Typography, Stack, IconButton, Popover } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import TravelModal from '../../../components/updateCom/travelModal';
import { CategoryContext } from '../../../context/categoryContext';

import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ travel, open, handleClose, handleOpen }) {
  const { changeState, setChangeState, setIsEdit, setSelectTravel } = useContext(CategoryContext);

  const { _id, title, images, detail, price, day, category } = travel;

  const [isOpenOptions, setOpenOptions] = useState(false);

  const handleCloseForm = () => {
    setOpenOptions(false);
  };

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
    <Card>
      <TravelModal open={open} handleClose={handleClose} />
      <Box>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          <StyledProductImg alt={title} src={images} />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Box>
            <Link color="inherit" underline="hover">
              <Typography variant="h4" noWrap>
                {title}
              </Typography>
            </Link>
            <Typography>{detail}</Typography>
            <Typography>Day: {day}</Typography>
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
              {fCurrency(price)}
            </Typography>
            <Box>
              <IconButton
                size="large"
                color="inherit"
                onClick={() => {
                  handleOpen();
                  setIsEdit(true);
                  setSelectTravel(travel);
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
              </IconButton>
              <IconButton size="large" color="inherit" onClick={() => deleteTravel(_id)}>
                <Iconify icon={'eva:trash-fill'} />
              </IconButton>
            </Box>
            {/* <IconButton size="large" color="inherit" onClick={() => setOpenOptions(!isOpenOptions)}>
              <Iconify icon={'eva:more-vertical-fill'} />
            </IconButton>

            <Popover
              // style={{ positon: 'relative', top: 0 }}
              open={isOpenOptions}
              anchorEl={open}
              onClose={handleClose}
            >
              
            </Popover> */}
          </Stack>
          {/* {isOpenOptions && (
            <>
              <IconButton size="large" color="inherit" onClick={() => setOpen(true)}>
                <Iconify icon={'eva:edit-fill'} />
              </IconButton>
              <IconButton size="large" color="inherit" onClick={() => deleteTravel(_id)}>
                <Iconify icon={'eva:trash-fill'} />
              </IconButton>
            </>
          )} */}
        </Stack>
      </Box>
    </Card>
  );
}
