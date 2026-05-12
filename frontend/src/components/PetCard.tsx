import React, { useState } from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  Chip, 
  Box, 
  IconButton, 
  Tooltip,
  Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

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

interface PetCardProps {
  pet: Pet;
  onView?: (pet: Pet) => void;
  onEdit?: (pet: Pet) => void;
  onDelete?: (id: number) => void;
}

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaidIcon from '@mui/icons-material/Paid';

const PetCard: React.FC<PetCardProps> = ({ pet, onView, onEdit, onDelete }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        border: 'none',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        position: 'relative',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
        },
      }}
    >
      {/* Management Actions */}
      <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 2, display: 'flex', gap: 1 }}>
        <Tooltip title="Edit Pet">
          <IconButton 
            size="small" 
            onClick={(e) => { e.stopPropagation(); onEdit?.(pet); }}
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.9)', 
              '&:hover': { bgcolor: 'white', transform: 'scale(1.1)' }, 
              backdropFilter: 'blur(4px)', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.2s'
            }}
          >
            <EditIcon fontSize="small" sx={{ color: '#475569' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Remove Pet">
          <IconButton 
            size="small" 
            onClick={(e) => { e.stopPropagation(); onDelete?.(pet.id); }}
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.9)', 
              '&:hover': { bgcolor: 'white', transform: 'scale(1.1)' }, 
              backdropFilter: 'blur(4px)', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.2s'
            }}
          >
            <DeleteIcon fontSize="small" color="error" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Favorite Button */}
      <IconButton 
        onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }}
        sx={{ 
          position: 'absolute', 
          top: 12, 
          right: 12, 
          zIndex: 2,
          bgcolor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(4px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': { bgcolor: 'white', transform: 'scale(1.1)' },
          transition: 'all 0.2s'
        }}
      >
        {isFavorite ? <FavoriteIcon sx={{ color: '#ef4444' }} /> : <FavoriteBorderIcon sx={{ color: '#64748b' }} />}
      </IconButton>

      <Box sx={{ position: 'relative', cursor: 'pointer', overflow: 'hidden' }} onClick={() => onView?.(pet)}>
        <Box
          sx={{
            width: '100%',
            paddingTop: '80%', // Slightly taller aspect ratio
            position: 'relative',
          }}
        >
          <CardMedia
            component="img"
            image={pet.imageUrl}
            alt={pet.name}
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s ease',
              '&:hover': {
                transform: 'scale(1.08)',
              }
            }}
          />
          <Box 
            sx={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              height: '40%', 
              background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
              pointerEvents: 'none'
            }} 
          />
        </Box>
        <Chip 
          label={pet.status} 
          size="small" 
          sx={{ 
            position: 'absolute', 
            bottom: 12, 
            right: 12,
            fontWeight: 800,
            fontSize: '0.65rem',
            px: 1,
            height: 24,
            bgcolor: pet.status === 'AVAILABLE' ? '#10b981' : '#f59e0b',
            color: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }} 
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2.5, cursor: 'pointer' }} onClick={() => onView?.(pet)}>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            fontWeight: 800, 
            color: '#0f172a', 
            fontSize: '1.25rem',
            mb: 0.5,
            lineHeight: 1.2
          }}
        >
          {pet.name}
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 2, color: '#64748b', fontWeight: 600, fontSize: '0.85rem' }}>
          {pet.breed || 'Mixed Breed'}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569' }}>
              {pet.age} mos
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PaidIcon sx={{ fontSize: 16, color: '#10b981' }} />
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#0f172a' }}>
              ${pet.price.toLocaleString()}
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          <Chip 
            label={pet.species} 
            size="small" 
            sx={{ 
              borderRadius: '6px', 
              fontSize: '0.65rem', 
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              bgcolor: '#f1f5f9',
              color: '#475569',
              border: '1px solid #e2e8f0'
            }} 
          />
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          variant="contained" 
          fullWidth 
          onClick={() => onView?.(pet)}
          sx={{ 
            borderRadius: 2.5, 
            textTransform: 'none', 
            fontWeight: 800,
            py: 1.2,
            bgcolor: '#0f172a',
            '&:hover': {
              bgcolor: '#334155',
              transform: 'scale(1.02)'
            },
            transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)',
          }}
        >
          View Story
        </Button>
      </CardActions>
    </Card>
  );
};

export default PetCard;
