import React, { useEffect, useState, useCallback, useMemo } from 'react';
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
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Divider,
  Slider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FilterListIcon from '@mui/icons-material/FilterList';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
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
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);
  const [debouncedPriceRange, setDebouncedPriceRange] = useState<number[]>([0, 5000]);
  const [favoritesCount, setFavoritesCount] = useState(0);

  // Dialog states
  const [formOpen, setFormOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  // Feedback states
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // Debounce price range with a slightly faster but stable timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPriceRange(priceRange);
    }, 400); // 400ms is a good sweet spot for smoothness vs response
    return () => clearTimeout(timer);
  }, [priceRange]);

  const fetchPets = useCallback(async (pageNumber: number, search: string, spec: string, sort: string, minP: number, maxP: number) => {
    setLoading(true);
    try {
      const params: any = { 
        page: pageNumber, 
        size: 8, 
        sort,
        minPrice: minP,
        maxPrice: maxP
      };
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
    fetchPets(0, searchTerm, species, sortBy, debouncedPriceRange[0], debouncedPriceRange[1]);
  }, [searchTerm, species, sortBy, debouncedPriceRange, fetchPets]);

  const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPets(nextPage, searchTerm, species, sortBy, debouncedPriceRange[0], debouncedPriceRange[1]);
  };

  const handleCreatePet = async (petData: any) => {
    try {
      await apiClient.post('/pets', petData);
      showSnackbar('Pet created successfully');
      setFormOpen(false);
      setPage(0);
      fetchPets(0, searchTerm, species, sortBy, debouncedPriceRange[0], debouncedPriceRange[1]);
    } catch (error) {
      showSnackbar('Failed to create pet', 'error');
    }
  };

  const handleUpdatePet = async (petData: any) => {
    try {
      const response = await apiClient.put(`/pets/${petData.id}`, petData);
      const updatedPet = response.data;
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

  const averagePrice = useMemo(() => {
    if (pets.length === 0) return 0;
    return Math.round(pets.reduce((acc, p) => acc + p.price, 0) / pets.length);
  }, [pets]);

  return (
    <Box sx={{ bgcolor: '#f1f5f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation */}
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #e2e8f0', color: '#0f172a' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 72 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ bgcolor: '#0f172a', p: 1, borderRadius: 2, display: 'flex' }}>
                <PetsIcon sx={{ color: 'white', fontSize: 24 }} />
              </Box>
              <Typography variant="h5" fontWeight="900" letterSpacing="-1px">
                PETSTORE<span style={{ color: '#3b82f6' }}>.</span>
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} alignItems="center">
              <Button 
                variant="contained" 
                startIcon={<AddIcon />} 
                onClick={() => openForm(null)}
                sx={{ 
                  borderRadius: 3, 
                  textTransform: 'none', 
                  fontWeight: 800, 
                  px: 3,
                  py: 1,
                  bgcolor: '#0f172a',
                  '&:hover': { bgcolor: '#1e293b' }
                }}
              >
                Add Member
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'radial-gradient(circle at 70% 30%, #1e293b 0%, #0f172a 100%)',
          color: 'white',
          pt: { xs: 8, md: 12 },
          pb: { xs: 12, md: 16 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }} />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="overline" 
            sx={{ fontWeight: 900, letterSpacing: 4, color: '#3b82f6', mb: 2, display: 'block' }}
          >
            DISCOVER YOUR COMPANION
          </Typography>
          <Typography 
            variant="h1" 
            fontWeight="900" 
            gutterBottom 
            sx={{ fontSize: { xs: '3rem', md: '5rem' }, letterSpacing: '-3px', lineHeight: 0.9, mb: 3 }}
          >
            Find a friend for <span style={{ color: '#3b82f6' }}>eternity.</span>
          </Typography>
          <Typography variant="h6" sx={{ color: '#94a3b8', mb: 8, fontWeight: 500, maxWidth: '650px', mx: 'auto', lineHeight: 1.6 }}>
            Our gallery features the most loving and healthy pets waiting for their new home. Manage your inventory with ease.
          </Typography>

          <Paper 
            elevation={24} 
            sx={{ 
              p: 2, 
              borderRadius: 4, 
              maxWidth: '900px', 
              mx: 'auto',
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: 2,
              bgcolor: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <TextField
              fullWidth
              placeholder="Search by name, breed or personality..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#3b82f6' }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 3, bgcolor: '#f8fafc', fontWeight: 600, '& fieldset': { border: 'none' } }
              }}
              size="medium"
            />

            <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
              <Tabs 
                value={species} 
                onChange={(_, newValue) => setSpecies(newValue)}
                indicatorColor="primary"
                textColor="primary"
                sx={{ 
                  minHeight: 48,
                  '& .MuiTabs-indicator': { height: 3, borderRadius: '3px 3px 0 0' },
                  '& .MuiTab-root': { fontWeight: 800, textTransform: 'none', fontSize: '0.9rem', px: 3 }
                }}
              >
                <Tab label="All" value="ALL" />
                <Tab label="Dogs" value="DOG" />
                <Tab label="Cats" value="CAT" />
                <Tab label="Birds" value="BIRD" />
                <Tab label="Fish" value="FISH" />
              </Tabs>
            </Stack>
          </Paper>
        </Container>
      </Box>

      {/* Stats & Filter Strip */}
      <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 10 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper 
              sx={{ 
                p: 3, 
                borderRadius: 4, 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between', 
                alignItems: 'center',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                gap: 4
              }}
            >
              <Stack direction="row" spacing={4} divider={<Divider orientation="vertical" flexItem />}>
                <Box>
                  <Typography variant="caption" fontWeight="900" color="#64748b" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                    Total Pets
                  </Typography>
                  <Typography variant="h4" fontWeight="900" color="#0f172a">
                    {totalPets}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" fontWeight="900" color="#64748b" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                    Avg Price
                  </Typography>
                  <Typography variant="h4" fontWeight="900" color="#3b82f6">
                    ${averagePrice.toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                  <Typography variant="caption" fontWeight="900" color="#64748b" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                    Inventory
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <TrendingUpIcon sx={{ color: '#10b981' }} />
                    <Typography variant="h6" fontWeight="900" color="#0f172a">Stable</Typography>
                  </Stack>
                </Box>
              </Stack>

              <FormControl sx={{ minWidth: 220 }} size="small">
                <InputLabel sx={{ fontWeight: 700 }}>Sort Strategy</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort Strategy"
                  onChange={(e) => setSortBy(e.target.value)}
                  sx={{ borderRadius: 3, fontWeight: 700, bgcolor: '#f8fafc' }}
                >
                  <MenuItem value="name,asc" sx={{ fontWeight: 600 }}>Name (A-Z)</MenuItem>
                  <MenuItem value="price,asc" sx={{ fontWeight: 600 }}>Price (Low to High)</MenuItem>
                  <MenuItem value="price,desc" sx={{ fontWeight: 600 }}>Price (High to Low)</MenuItem>
                  <MenuItem value="age,asc" sx={{ fontWeight: 600 }}>Age (Youngest First)</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper 
              sx={{ 
                p: 3, 
                borderRadius: 4, 
                height: '100%',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <FilterListIcon sx={{ color: '#3b82f6', fontSize: 20 }} />
                <Typography variant="subtitle2" fontWeight="900" color="#0f172a">
                  PRICE THRESHOLD (${priceRange[0]} - ${priceRange[1]})
                </Typography>
              </Stack>
              <Slider
                value={priceRange}
                onChange={(_, newValue) => setPriceRange(newValue as number[])}
                valueLabelDisplay="auto"
                min={0}
                max={5000}
                sx={{ color: '#3b82f6' }}
              />
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="caption" fontWeight="800" color="#64748b">$0</Typography>
                <Typography variant="caption" fontWeight="800" color="#64748b">$5,000+</Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Main Content */}
      <Container sx={{ py: 10, flexGrow: 1 }} maxWidth="lg">
        {loading && page === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress thickness={5} size={60} sx={{ color: '#0f172a' }} />
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
              <Box sx={{ textAlign: 'center', py: 15, bgcolor: 'white', borderRadius: 8, border: '2px dashed #e2e8f0' }}>
                <PetsIcon sx={{ fontSize: 64, color: '#cbd5e1', mb: 2 }} />
                <Typography variant="h4" fontWeight="900" color="#1e293b" gutterBottom>
                  No companions match your search
                </Typography>
                <Typography variant="body1" color="#64748b" sx={{ mb: 4 }}>
                  Try adjusting your filters or search terms to find what you're looking for.
                </Typography>
                <Button 
                  variant="outlined" 
                  onClick={() => { setSearchTerm(''); setSpecies('ALL'); setPriceRange([0, 5000]); }}
                  sx={{ borderRadius: 3, px: 4, py: 1.5, fontWeight: 800, borderWidth: 2, '&:hover': { borderWidth: 2 } }}
                >
                  Clear All Filters
                </Button>
              </Box>
            )}

            {!loading && !lastPage && pets.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <Button 
                  variant="contained" 
                  onClick={handleLoadMore}
                  sx={{ 
                    px: 8, 
                    py: 2, 
                    borderRadius: 4, 
                    textTransform: 'none', 
                    fontWeight: 900,
                    fontSize: '1.1rem',
                    bgcolor: '#0f172a',
                    '&:hover': { bgcolor: '#1e293b', transform: 'scale(1.05)' },
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                >
                  Discover More
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: '#0f172a', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between" alignItems="center">
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 1, borderRadius: 2 }}>
                  <PetsIcon sx={{ color: 'white', fontSize: 24 }} />
                </Box>
                <Typography variant="h5" fontWeight="900">
                  PETSTORE<span style={{ color: '#3b82f6' }}>.</span>
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: '#94a3b8', mt: 2, maxWidth: 400 }}>
                Professional pet inventory and discovery platform. Dedicated to providing the best management tools for your animal companions.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
              <Typography variant="body2" color="#64748b" fontWeight="600">
                © {new Date().getFullYear()} Petstore Inventory System.
              </Typography>
              <Typography variant="caption" color="#475569">
                Crafted for excellence in pet management.
              </Typography>
            </Grid>
          </Grid>
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
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: '100%', borderRadius: 3, fontWeight: 700 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ListingPage;
