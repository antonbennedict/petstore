import React, { useEffect, useState, useCallback } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Box, 
  CircularProgress, 
  TextField, 
  InputAdornment,
  Paper,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  AppBar,
  Toolbar,
  Link,
  IconButton,
  Stack,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PetsIcon from '@mui/icons-material/Pets';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import apiClient from '../services/apiClient';
import PetCard from '../components/PetCard';
import PetFormDialog from '../components/PetFormDialog';
import PetDetailsDialog from '../components/PetDetailsDialog';

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  price: number;
  imageUrl: string;
  status: string;
  description: string;
}

const ListingPage: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [totalPets, setTotalPets] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [species, setSpecies] = useState('ALL');
  const [sortBy, setSortBy] = useState('name,asc');
  const [isAdmin, setIsAdmin] = useState(false);

  // Dialog states
  const [formOpen, setFormOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  // Feedback states
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const fetchPets = useCallback(async (pageNumber: number, search: string, spec: string, sort: string) => {
    setLoading(true);
    try {
      const params: any = { page: pageNumber, size: 8, sort };
      if (search) params.search = search;
      if (spec !== 'ALL') params.species = spec;

      const response = await apiClient.get('/pets', { params });
      const data = response.data;
      
      if (pageNumber === 0) {
        setPets(data.content);
        setTotalPets(data.totalElements);
      } else {
        setPets((prev) => [...prev, ...data.content]);
      }
      setLastPage(data.last);
    } catch (error) {
      console.error('Error fetching pets:', error);
      showSnackbar('Failed to fetch pets', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setPage(0);
    fetchPets(0, searchTerm, species, sortBy);
  }, [searchTerm, species, sortBy, fetchPets]);

  const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPets(nextPage, searchTerm, species, sortBy);
  };

  const handleCreatePet = async (petData: any) => {
    try {
      await apiClient.post('/pets', petData);
      showSnackbar('Pet created successfully');
      setFormOpen(false);
      // Reset to page 0 and refetch
      setPage(0);
      fetchPets(0, searchTerm, species, sortBy);
    } catch (error) {
      showSnackbar('Failed to create pet', 'error');
    }
  };

  const handleUpdatePet = async (petData: any) => {
    try {
      const response = await apiClient.put(`/pets/${petData.id}`, petData);
      const updatedPet = response.data;
      
      // Update local state immediately so we don't lose pagination/scroll
      setPets((prev) => prev.map((p) => (p.id === updatedPet.id ? updatedPet : p)));
      
      showSnackbar('Pet updated successfully');
      setFormOpen(false);
    } catch (error) {
      showSnackbar('Failed to update pet', 'error');
    }
  };

  const handleDeletePet = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        await apiClient.delete(`/pets/${id}`);
        
        // Remove from local state immediately
        setPets((prev) => prev.filter((p) => p.id !== id));
        setTotalPets((prev) => prev - 1);
        
        showSnackbar('Pet deleted successfully');
      } catch (error) {
        showSnackbar('Failed to delete pet', 'error');
      }
    }
  };

  const openForm = (pet: Pet | null = null) => {
    setSelectedPet(pet);
    setFormOpen(true);
  };

  const openDetails = (pet: Pet) => {
    setSelectedPet(pet);
    setDetailsOpen(true);
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation */}
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #e2e8f0', color: '#1e293b' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PetsIcon color="primary" sx={{ fontSize: 28 }} />
              <Typography variant="h6" fontWeight="800" letterSpacing="-0.5px">
                PETSTORE
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button 
                variant="contained" 
                size="small"
                startIcon={<AddIcon />} 
                onClick={() => openForm(null)}
                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, px: 2 }}
              >
                Add Pet
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: 'white',
          py: { xs: 8, md: 10 },
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            fontWeight="800" 
            gutterBottom 
            sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, letterSpacing: '-1px' }}
          >
            Pet Discovery Gallery
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.8, mb: 6, fontWeight: 400, maxWidth: '600px', mx: 'auto' }}>
            Manage and browse our curated collection of animal companions.
          </Typography>

          <Paper 
            elevation={4} 
            sx={{ 
              p: 1, 
              borderRadius: 3, 
              maxWidth: '800px', 
              mx: 'auto',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 1
            }}
          >
            <TextField
              fullWidth
              placeholder="Search by name, breed..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2, bgcolor: '#f8fafc', border: 'none', '& fieldset': { border: 'none' } }
              }}
              size="small"
            />
            <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
            <Tabs 
              value={species} 
              onChange={(_, newValue) => setSpecies(newValue)}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              sx={{ minHeight: 40 }}
            >
              <Tab label="All" value="ALL" sx={{ fontWeight: 700, minHeight: 40 }} />
              <Tab label="Dogs" value="DOG" sx={{ fontWeight: 700, minHeight: 40 }} />
              <Tab label="Cats" value="CAT" sx={{ fontWeight: 700, minHeight: 40 }} />
              <Tab label="Birds" value="BIRD" sx={{ fontWeight: 700, minHeight: 40 }} />
              <Tab label="Fish" value="FISH" sx={{ fontWeight: 700, minHeight: 40 }} />
            </Tabs>
          </Paper>
        </Container>
      </Box>

      {/* Inventory Info */}
      <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 10 }}>
        <Paper 
          sx={{ 
            p: 2, 
            borderRadius: 2, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Box>
            <Typography variant="subtitle2" fontWeight="700" color="text.secondary">
              INVENTORY COUNT
            </Typography>
            <Typography variant="h5" fontWeight="800" color="primary">
              {totalPets}
            </Typography>
          </Box>
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="name,asc">Name (A-Z)</MenuItem>
              <MenuItem value="price,asc">Price (Low to High)</MenuItem>
              <MenuItem value="price,desc">Price (High to Low)</MenuItem>
              <MenuItem value="age,asc">Age (Youngest First)</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </Container>

      {/* Main Content */}
      <Container sx={{ py: 6, flexGrow: 1 }} maxWidth="lg">
        {loading && page === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {pets.length > 0 ? (
              <Grid container spacing={4}>
                {pets.map((pet) => (
                  <Grid item key={pet.id} xs={12} sm={6} md={3}>
                    <PetCard 
                      pet={pet} 
                      onView={openDetails}
                      onEdit={openForm}
                      onDelete={handleDeletePet}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center', py: 10 }}>
                <Typography variant="h5" fontWeight="700" color="text.secondary">
                  No pets found
                </Typography>
                <Button 
                  variant="outlined" 
                  onClick={() => { setSearchTerm(''); setSpecies('ALL'); }}
                  sx={{ mt: 2, borderRadius: 2 }}
                >
                  Reset Filters
                </Button>
              </Box>
            )}

            {!loading && !lastPage && pets.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                <Button 
                  variant="contained" 
                  onClick={handleLoadMore}
                  sx={{ 
                    px: 6, 
                    py: 1.5, 
                    borderRadius: 3, 
                    textTransform: 'none', 
                    fontWeight: 700,
                    bgcolor: '#1e293b'
                  }}
                >
                  Load More
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: 'white', borderTop: '1px solid #e2e8f0', py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center" fontWeight="500">
            © {new Date().getFullYear()} Petstore Inventory Management System
          </Typography>
        </Container>
      </Box>

      <PetFormDialog 
        open={formOpen} 
        onClose={() => setFormOpen(false)} 
        onSave={selectedPet ? handleUpdatePet : handleCreatePet}
        pet={selectedPet}
      />

      <PetDetailsDialog 
        open={detailsOpen} 
        onClose={() => setDetailsOpen(false)} 
        pet={selectedPet} 
      />

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ListingPage;
