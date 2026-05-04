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
  Divider,
  Stack,
  IconButton,
  Tooltip
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PetsIcon from '@mui/icons-material/Pets';
import CategoryIcon from '@mui/icons-material/Category';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';

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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Meet ${pet.name}`,
        text: `Check out this amazing ${pet.species} at our Petstore!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('Sharing is not supported on this browser');
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 4, overflow: 'hidden' }
      }}
    >
      <Box sx={{ position: 'absolute', right: 16, top: 16, zIndex: 10 }}>
        <IconButton onClick={onClose} sx={{ bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)', '&:hover': { bgcolor: 'white' } }}>
          <CloseIcon />
        </IconButton>
      </Box>

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
                minHeight: { xs: 300, md: 500 },
                maxHeight: { xs: 400, md: 600 },
                objectFit: 'cover'
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Chip 
                  label={pet.status} 
                  sx={{ 
                    fontWeight: 800, 
                    bgcolor: pet.status === 'AVAILABLE' ? '#dcfce7' : '#fef3c7',
                    color: pet.status === 'AVAILABLE' ? '#166534' : '#92400e',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase'
                  }} 
                />
                <Tooltip title="Share this pet">
                  <IconButton onClick={handleShare} size="small" sx={{ color: '#64748b' }}>
                    <ShareIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>

              <Typography variant="h3" fontWeight="900" sx={{ mb: 1, color: '#0f172a', letterSpacing: '-0.02em' }}>
                {pet.name}
              </Typography>
              
              <Typography variant="h4" fontWeight="800" sx={{ mb: 4, color: '#3b82f6' }}>
                ${pet.price.toLocaleString()}
              </Typography>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={6}>
                  <Stack spacing={0.5}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CategoryIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                      <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, lineHeight: 1 }}>Species</Typography>
                    </Stack>
                    <Typography variant="body1" fontWeight="700" color="#334155">{pet.species}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={0.5}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PetsIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                      <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, lineHeight: 1 }}>Breed</Typography>
                    </Stack>
                    <Typography variant="body1" fontWeight="700" color="#334155">{pet.breed || 'Mixed Breed'}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={0.5}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AccessTimeIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                      <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, lineHeight: 1 }}>Age</Typography>
                    </Stack>
                    <Typography variant="body1" fontWeight="700" color="#334155">{pet.age} months</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={0.5}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <FingerprintIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                      <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, lineHeight: 1 }}>Reference</Typography>
                    </Stack>
                    <Typography variant="body1" fontWeight="700" color="#334155">#{pet.id}</Typography>
                  </Stack>
                </Grid>
              </Grid>

              <Divider sx={{ mb: 4 }} />

              <Typography variant="subtitle1" fontWeight="800" sx={{ mb: 1, color: '#0f172a' }}>
                The Story
              </Typography>
              <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.7, mb: 4 }}>
                {pet.description || `${pet.name} is a wonderful ${pet.breed || pet.species} looking for a forever home. This charming companion is full of personality and waiting to meet you!`}
              </Typography>

              <Button 
                variant="contained" 
                fullWidth 
                size="large"
                sx={{ 
                  py: 2, 
                  borderRadius: 3, 
                  textTransform: 'none', 
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  bgcolor: '#0f172a',
                  '&:hover': { bgcolor: '#1e293b' },
                  boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.2)'
                }}
              >
                Start Adoption Inquiry
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default PetDetailsDialog;
