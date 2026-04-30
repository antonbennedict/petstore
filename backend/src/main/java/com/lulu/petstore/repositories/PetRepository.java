package com.lulu.petstore.repositories;

import com.lulu.petstore.models.Pet;
import com.lulu.petstore.models.Species;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pet, Long> {
    Page<Pet> findBySpecies(Species species, Pageable pageable);
    Page<Pet> findByNameContainingIgnoreCase(String name, Pageable pageable);
    Page<Pet> findBySpeciesAndNameContainingIgnoreCase(Species species, String name, Pageable pageable);
}
