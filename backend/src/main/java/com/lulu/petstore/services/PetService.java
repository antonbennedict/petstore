package com.lulu.petstore.services;

import com.lulu.petstore.models.Pet;
import com.lulu.petstore.models.Species;
import com.lulu.petstore.repositories.PetRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PetService {
    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public Page<Pet> getAllPets(Optional<Species> species, Optional<String> search, Pageable pageable) {
        if (species.isPresent() && search.isPresent()) {
            return petRepository.findBySpeciesAndNameContainingIgnoreCase(species.get(), search.get(), pageable);
        } else if (species.isPresent()) {
            return petRepository.findBySpecies(species.get(), pageable);
        } else if (search.isPresent()) {
            return petRepository.findByNameContainingIgnoreCase(search.get(), pageable);
        }
        return petRepository.findAll(pageable);
    }

    public Optional<Pet> getPetById(Long id) {
        return petRepository.findById(id);
    }

    public Pet savePet(Pet pet) {
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
            pet.setCategory(petDetails.getCategory());
            return petRepository.save(pet);
        }).orElseThrow(() -> new RuntimeException("Pet not found with id " + id));
    }

    public void deletePet(Long id) {
        petRepository.deleteById(id);
    }
}
