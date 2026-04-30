package com.lulu.petstore.config;

import com.lulu.petstore.models.Category;
import com.lulu.petstore.models.Pet;
import com.lulu.petstore.models.PetStatus;
import com.lulu.petstore.models.Species;
import com.lulu.petstore.repositories.CategoryRepository;
import com.lulu.petstore.repositories.PetRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.Arrays;

@Configuration
public class DataInitializer implements CommandLineRunner {

    private final PetRepository petRepository;
    private final CategoryRepository categoryRepository;

    public DataInitializer(PetRepository petRepository, CategoryRepository categoryRepository) {
        this.petRepository = petRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) {
        if (categoryRepository.count() == 0) {
            Category dogs = new Category(null, "Dogs", "pets");
            Category cats = new Category(null, "Cats", "cat");
            Category birds = new Category(null, "Birds", "flutter_dash");
            Category fishes = new Category(null, "Fishes", "phishing");

            categoryRepository.saveAll(Arrays.asList(dogs, cats, birds, fishes));

            petRepository.save(new Pet(null, "Buddy", Species.DOG, "Golden Retriever", 24, 
                    new BigDecimal("500.00"), "https://images.unsplash.com/photo-1552053831-71594a27632d", 
                    "Friendly and energetic.", PetStatus.AVAILABLE, dogs));

            petRepository.save(new Pet(null, "Luna", Species.CAT, "Siamese", 12, 
                    new BigDecimal("300.00"), "https://images.unsplash.com/photo-1592194996308-7b43878e84a6", 
                    "Quiet and affectionate.", PetStatus.AVAILABLE, cats));

            petRepository.save(new Pet(null, "Goldie", Species.FISH, "Goldfish", 6, 
                    new BigDecimal("15.00"), "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5", 
                    "Easy to care for.", PetStatus.AVAILABLE, fishes));
            
            petRepository.save(new Pet(null, "Bluey", Species.BIRD, "Parakeet", 18, 
                    new BigDecimal("50.00"), "https://images.unsplash.com/photo-1550853024-fae8cd4be47f", 
                    "Talkative and colorful.", PetStatus.AVAILABLE, birds));
        }
    }
}
