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
  FavoriteBorder,
  Favorite
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

const PetCard: React.FC<PetCardProps> = ({ pet, onView, onEdit, onDelete }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid #edf2f7',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        position: 'relative',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 12px 20px -5px rgba(0, 0, 0, 0.1), 0 8px 8px -5px rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      {/* Management Actions */}
      <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 2, display: 'flex', gap: 1 }}>
        <Tooltip title="Edit Pet">
          <IconButton 
            size="small" 
            onClick={(e) => { e.stopPropagation(); onEdit?.(pet); }}
            sx={{ bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: 'white' }, backdropFilter: 'blur(4px)', boxShadow: 1 }}
          >
            <EditIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Remove Pet">
          <IconButton 
            size="small" 
            onClick={(e) => { e.stopPropagation(); onDelete?.(pet.id); }}
            sx={{ bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: 'white' }, backdropFilter: 'blur(4px)', boxShadow: 1 }}
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
          boxShadow: 1,
          '&:hover': { bgcolor: 'white' }
        }}
      >
        {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </IconButton>

      <Box sx={{ position: 'relative', cursor: 'pointer', overflow: 'hidden' }} onClick={() => onView?.(pet)}>
        <Box
          sx={{
            width: '100%',
            paddingTop: '75%', // 4:3 Aspect Ratio
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
              transition: 'transform 0.5s ease',
              '&:hover': {
                transform: 'scale(1.1)',
              }
            }}
          />
        </Box>
        <Chip 
          label={pet.status} 
          size="small" 
          color={pet.status === 'AVAILABLE' ? 'success' : 'warning'}
          sx={{ 
            position: 'absolute', 
            bottom: 12, 
            right: 12,
            fontWeight: 'bold',
            fontSize: '0.65rem',
            px: 1,
            height: 24,
            bgcolor: pet.status === 'AVAILABLE' ? '#10b981' : '#f59e0b',
            color: 'white',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }} 
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2.5, cursor: 'pointer' }} onClick={() => onView?.(pet)}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 800, color: '#1a202c', fontSize: '1.1rem' }}>
            {pet.name}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#3182ce' }}>
            ${pet.price.toLocaleString()}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
          {pet.breed} • {pet.age} {pet.age === 1 ? 'mo' : 'mos'}
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          <Chip 
            label={pet.species} 
            size="small" 
            sx={{ 
              borderRadius: '6px', 
              fontSize: '0.65rem', 
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              bgcolor: '#ebf8ff',
              color: '#2b6cb0',
              border: 'none'
            }} 
          />
          {pet.age < 12 && (
            <Chip 
              label="Puppy/Kitten" 
              size="small" 
              sx={{ 
                borderRadius: '6px', 
                fontSize: '0.65rem', 
                fontWeight: 700,
                textTransform: 'uppercase',
                bgcolor: '#fff5f5',
                color: '#c53030',
                border: 'none'
              }} 
            />
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          variant="contained" 
          fullWidth 
          onClick={() => onView?.(pet)}
          sx={{ 
            borderRadius: 2, 
            textTransform: 'none', 
            fontWeight: 700,
            py: 1,
            bgcolor: '#2d3748',
            '&:hover': {
              bgcolor: '#1a202c',
            },
            boxShadow: 'none',
          }}
        >
          View Story
        </Button>
      </CardActions>
    </Card>
  );
};

export default PetCard;
