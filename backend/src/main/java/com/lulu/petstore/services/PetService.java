package com.lulu.petstore.services;

import com.lulu.petstore.models.Pet;
import com.lulu.petstore.models.Species;
import com.lulu.petstore.repositories.PetRepository;
import com.lulu.petstore.repositories.CategoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class PetService {
    private final PetRepository petRepository;
    private final CategoryRepository categoryRepository;

    public PetService(PetRepository petRepository, CategoryRepository categoryRepository) {
        this.petRepository = petRepository;
        this.categoryRepository = categoryRepository;
    }

    public Page<Pet> getAllPets(Optional<Species> species, Optional<String> search, 
                               BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable) {
        // Pre-format search pattern to be lowercase with wildcards
        String searchPattern = search.map(s -> "%" + s.toLowerCase() + "%").orElse(null);
        BigDecimal min = minPrice != null ? minPrice : BigDecimal.ZERO;
        BigDecimal max = maxPrice != null ? maxPrice : new BigDecimal("1000000");
        
        return petRepository.findWithFilters(
                species.orElse(null),
                searchPattern,
                min,
                max,
                pageable
        );
    }

    public Optional<Pet> getPetById(Long id) {
        return petRepository.findById(id);
    }

    public Pet savePet(Pet pet) {
        if (pet.getCategory() == null && pet.getSpecies() != null) {
            String categoryName = switch (pet.getSpecies()) {
                case DOG -> "Dogs";
                case CAT -> "Cats";
                case BIRD -> "Birds";
                case FISH -> "Fishes";
            };
            categoryRepository.findByName(categoryName).ifPresent(pet::setCategory);
        }
        return petRepository.save(pet);
    }

    public Pet updatePet(Long id, Pet petDetails) {
        return petRepository.findById(id).map(pet -> {
            pet.setName(petDetails.getName());
            pet.setSpecies(petDetails.getSpecies());
            pet.setBreed(petDetails.getBreed());
            pet.setAge(petDetails.getAge());
            pet.setPrice(petDetails.getPrice());
            pet.setImageUrl(petDetails.getImageUrl());
            pet.setDescription(petDetails.getDescription());
            pet.setStatus(petDetails.getStatus());
            
            if (petDetails.getCategory() != null) {
                pet.setCategory(petDetails.getCategory());
            } else if (petDetails.getSpecies() != pet.getSpecies()) {
                String categoryName = switch (petDetails.getSpecies()) {
                    case DOG -> "Dogs";
                    case CAT -> "Cats";
                    case BIRD -> "Birds";
                    case FISH -> "Fishes";
                };
                categoryRepository.findByName(categoryName).ifPresent(pet::setCategory);
            }
            
            return petRepository.save(pet);
        }).orElseThrow(() -> new RuntimeException("Pet not found with id " + id));
    }

    public void deletePet(Long id) {
        petRepository.deleteById(id);
    }
}
