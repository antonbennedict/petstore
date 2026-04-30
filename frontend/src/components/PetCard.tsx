import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Chip, Box } from '@mui/material';

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  price: number;
  imageUrl: string;
  status: string;
}

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={pet.imageUrl}
        alt={pet.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {pet.name}
          </Typography>
          <Chip label={pet.species} size="small" color="primary" variant="outlined" />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {pet.breed} • {pet.age} months
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
          ${pet.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" fullWidth>View Details</Button>
      </CardActions>
    </Card>
  );
};

export default PetCard;
