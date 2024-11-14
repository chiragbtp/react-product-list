import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialog-paper': {
    minWidth: '500px',
    maxWidth: '800px',
    borderRadius: '16px',
    position: 'relative',
  },
}));

const ProductModal = ({ open, product, handleClose }) => {
  return (
    <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Product Details
        </Typography>
      </DialogTitle>

      {/* Close Button */}
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        })}
      >
        <CloseIcon />
      </IconButton>

      {/* Product Modal Content */}
      <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {product ? (
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            {/* Image with Styling */}
            <Box sx={{ flex: '1', marginRight: '16px' }}>
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '200px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                }}
              />
            </Box>

            {/* Content */}
            <Box sx={{ flex: '2', textAlign: 'left' }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                {product.title}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '16px', color: 'text.secondary' }}>
                {product.description}
              </Typography>
              <Typography variant="h6" sx={{ marginBottom: '8px' }}>
                Price: <span style={{ fontWeight: 'bold' }}>${product.price}</span>
              </Typography>
              <Typography variant="body1">
                Rating: <span style={{ fontWeight: 'bold' }}>{product.rating.rate} Stars</span>
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography variant="body1" color="text.secondary">
            Loading product details...
          </Typography>
        )}
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{
            padding: '8px 16px',
            borderRadius: '20px',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default ProductModal;
