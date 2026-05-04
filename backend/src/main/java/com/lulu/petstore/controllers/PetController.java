package com.lulu.petstore.controllers;

import com.lulu.petstore.models.Category;
import com.lulu.petstore.models.Pet;
import com.lulu.petstore.models.Species;
import com.lulu.petstore.repositories.CategoryRepository;
import com.lulu.petstore.services.PetService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/lulu/pets")
public class PetController {
    private final PetService petService;
    private final CategoryRepository categoryRepository;

    public PetController(PetService petService, CategoryRepository categoryRepository) {
        this.petService = petService;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public ResponseEntity<Page<Pet>> getAllPets(
            @RequestParam Optional<Species> species,
            @RequestParam Optional<String> search,
            Pageable pageable) {
        return ResponseEntity.ok(petService.getAllPets(species, search, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable Long id) {
        return petService.getPetById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Pet> createPet(@RequestBody Pet pet) {
        return ResponseEntity.ok(petService.savePet(pet));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable Long id, @RequestBody Pet pet) {
        try {
            return ResponseEntity.ok(petService.updatePet(id, pet));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id) {
        petService.deletePet(id);
        return ResponseEntity.noContent().build();
    }
}
