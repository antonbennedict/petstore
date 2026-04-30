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
}
