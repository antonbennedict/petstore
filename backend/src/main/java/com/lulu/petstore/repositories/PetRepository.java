package com.lulu.petstore.repositories;

import com.lulu.petstore.models.Pet;
import com.lulu.petstore.models.Species;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;

public interface PetRepository extends JpaRepository<Pet, Long> {
    
    @Query("SELECT p FROM Pet p WHERE " +
           "(:species IS NULL OR p.species = :species) AND " +
           "(:search IS NULL OR LOWER(p.name) LIKE :search OR LOWER(p.breed) LIKE :search) AND " +
           "(p.price >= :minPrice) AND " +
           "(p.price <= :maxPrice)")
    Page<Pet> findWithFilters(
            @Param("species") Species species,
            @Param("search") String search,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            Pageable pageable);
}
