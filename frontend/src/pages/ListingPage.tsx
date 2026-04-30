import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, Box, CircularProgress } from '@mui/material';
import apiClient from '../services/apiClient';
import PetCard from '../components/PetCard';

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

const ListingPage: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(false);

  const fetchPets = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await apiClient.get('/pets', {
        params: { page: pageNumber, size: 8 }
      });
      const data = response.data;
      if (pageNumber === 0) {
        setPets(data.content);
      } else {
        setPets((prev) => [...prev, ...data.content]);
      }
      setLastPage(data.last);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets(0);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPets(nextPage);
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography variant="h3" component="h1" align="center" color="text.primary" gutterBottom>
        Petstore
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Find your perfect companion among our dogs, cats, birds, and fishes.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {pets.map((pet) => (
          <Grid item key={pet.id} xs={12} sm={6} md={3}>
            <PetCard pet={pet} />
          </Grid>
        ))}
      </Grid>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && !lastPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant="outlined" onClick={handleLoadMore}>
            Load More
          </Button>
        </Box>
      )}

      {lastPage && pets.length > 0 && (
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 4 }}>
          No more pets to load.
        </Typography>
      )}

      {!loading && pets.length === 0 && (
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 4 }}>
          No pets found.
        </Typography>
      )}
    </Container>
  );
};

export default ListingPage;
