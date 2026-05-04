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
  Typography
} from '@mui/material';

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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{pet ? 'Edit Pet' : 'Add New Pet'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Name"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
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
                label="Status"
                fullWidth
                required
                value={formData.status}
                onChange={handleChange}
              >
                <MenuItem value="AVAILABLE">Available</MenuItem>
                <MenuItem value="PENDING">Pending</MenuItem>
                <MenuItem value="SOLD">Sold</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="breed"
                label="Breed"
                fullWidth
                value={formData.breed}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="age"
                label="Age (months)"
                type="number"
                fullWidth
                value={formData.age}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="price"
                label="Price ($)"
                type="number"
                fullWidth
                value={formData.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="imageUrl"
                label="Image URL"
                fullWidth
                required
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {pet ? 'Update Pet' : 'Create Pet'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PetFormDialog;
