import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Box,
  Typography,
  Stack,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Pet {
  id?: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  price: number;
  imageUrl: string;
  description: string;
  status: string;
}

interface PetFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (pet: Pet) => void;
  pet?: Pet | null;
}

const PetFormDialog: React.FC<PetFormDialogProps> = ({ open, onClose, onSave, pet }) => {
  const [formData, setFormData] = useState<Pet>({
    name: '',
    species: 'DOG',
    breed: '',
    age: 0,
    price: 0,
    imageUrl: '',
    description: '',
    status: 'AVAILABLE'
  });

  useEffect(() => {
    if (pet) {
      setFormData(pet);
    } else {
      setFormData({
        name: '',
        species: 'DOG',
        breed: '',
        age: 0,
        price: 0,
        imageUrl: '',
        description: '',
        status: 'AVAILABLE'
      });
    }
  }, [pet, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' || name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 4, p: 1 }
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ p: 3, pb: 0 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="900" color="#0f172a">
              {pet ? 'Edit Member' : 'Add New Member'}
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
          <Typography variant="body2" color="#64748b" fontWeight="500" sx={{ mt: 1 }}>
            Fill in the details below to update the gallery.
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Member Name"
                placeholder="e.g. Buddy, Max"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
                InputProps={{ sx: { borderRadius: 3, fontWeight: 600 } }}
                InputLabelProps={{ sx: { fontWeight: 700 } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                name="species"
                label="Species"
                fullWidth
                required
                value={formData.species}
                onChange={handleChange}
                InputProps={{ sx: { borderRadius: 3, fontWeight: 600 } }}
                InputLabelProps={{ sx: { fontWeight: 700 } }}
              >
                <MenuItem value="DOG">Dog</MenuItem>
                <MenuItem value="CAT">Cat</MenuItem>
                <MenuItem value="BIRD">Bird</MenuItem>
                <MenuItem value="FISH">Fish</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                name="status"
                label="Availability"
                fullWidth
                required
                value={formData.status}
                onChange={handleChange}
                InputProps={{ sx: { borderRadius: 3, fontWeight: 600 } }}
                InputLabelProps={{ sx: { fontWeight: 700 } }}
              >
                <MenuItem value="AVAILABLE">Available</MenuItem>
                <MenuItem value="PENDING">Pending Inquiry</MenuItem>
                <MenuItem value="SOLD">Adopted</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="breed"
                label="Specific Breed"
                placeholder="e.g. Golden Retriever"
                fullWidth
                value={formData.breed}
                onChange={handleChange}
                InputProps={{ sx: { borderRadius: 3, fontWeight: 600 } }}
                InputLabelProps={{ sx: { fontWeight: 700 } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="age"
                label="Age (Months)"
                type="number"
                fullWidth
                value={formData.age}
                onChange={handleChange}
                InputProps={{ sx: { borderRadius: 3, fontWeight: 600 } }}
                InputLabelProps={{ sx: { fontWeight: 700 } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="price"
                label="Value ($)"
                type="number"
                fullWidth
                value={formData.price}
                onChange={handleChange}
                InputProps={{ sx: { borderRadius: 3, fontWeight: 600 } }}
                InputLabelProps={{ sx: { fontWeight: 700 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="imageUrl"
                label="Media URL"
                placeholder="https://images.unsplash.com/..."
                fullWidth
                required
                value={formData.imageUrl}
                onChange={handleChange}
                InputProps={{ sx: { borderRadius: 3, fontWeight: 600 } }}
                InputLabelProps={{ sx: { fontWeight: 700 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Member Bio / Story"
                placeholder="Tell us about this companion..."
                fullWidth
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                InputProps={{ sx: { borderRadius: 3, fontWeight: 600 } }}
                InputLabelProps={{ sx: { fontWeight: 700 } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button 
            onClick={onClose} 
            sx={{ 
              borderRadius: 3, 
              textTransform: 'none', 
              fontWeight: 800, 
              color: '#64748b',
              px: 3
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ 
              borderRadius: 3, 
              textTransform: 'none', 
              fontWeight: 900,
              bgcolor: '#0f172a',
              px: 4,
              py: 1.2,
              '&:hover': { bgcolor: '#1e293b' }
            }}
          >
            {pet ? 'Save Changes' : 'Confirm Addition'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PetFormDialog;
