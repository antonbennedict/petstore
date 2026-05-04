import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  Divider
} from '@mui/material';

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  price: number;
  imageUrl: string;
  description: string;
  status: string;
}

interface PetDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  pet: Pet | null;
}

const PetDetailsDialog: React.FC<PetDetailsDialogProps> = ({ open, onClose, pet }) => {
  if (!pet) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent sx={{ p: 0 }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={pet.imageUrl}
              alt={pet.name}
              sx={{
                width: '100%',
                height: '100%',
                minHeight: 400,
                objectFit: 'cover'
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" fontWeight="700">
                  {pet.name}
                </Typography>
                <Chip 
                  label={pet.status} 
                  color={pet.status === 'AVAILABLE' ? 'success' : 'warning'}
                  variant="filled"
                />
              </Box>
              
              <Typography variant="h5" color="primary" fontWeight="700" sx={{ mb: 3 }}>
                ${pet.price.toLocaleString()}
              </Typography>

              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={6}>
                  <Typography variant="overline" color="text.secondary">Species</Typography>
                  <Typography variant="body1" fontWeight="600">{pet.species}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="overline" color="text.secondary">Breed</Typography>
                  <Typography variant="body1" fontWeight="600">{pet.breed || 'N/A'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="overline" color="text.secondary">Age</Typography>
                  <Typography variant="body1" fontWeight="600">{pet.age} months</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="overline" color="text.secondary">ID</Typography>
                  <Typography variant="body1" fontWeight="600">#{pet.id}</Typography>
                </Grid>
              </Grid>

              <Divider sx={{ mb: 3 }} />

              <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
                Description
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {pet.description || "No description available for this pet. Contact us for more information."}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2, bgcolor: '#f9f9f9' }}>
        <Button onClick={onClose} variant="outlined">Close</Button>
        <Button variant="contained" color="primary" sx={{ px: 4 }}>
          Inquire to Adopt
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PetDetailsDialog;
