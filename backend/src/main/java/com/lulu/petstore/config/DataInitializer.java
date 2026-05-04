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

            petRepository.save(new Pet(null, "Max", Species.DOG, "German Shepherd", 36, 
                    new BigDecimal("600.00"), "https://images.unsplash.com/photo-1589944172368-1379f344e978", 
                    "Loyal and brave.", PetStatus.AVAILABLE, dogs));

            petRepository.save(new Pet(null, "Misty", Species.CAT, "Maine Coon", 24, 
                    new BigDecimal("450.00"), "https://images.unsplash.com/photo-1533738363-b7f9aef128ce", 
                    "Large and gentle.", PetStatus.AVAILABLE, cats));

            petRepository.save(new Pet(null, "Charlie", Species.DOG, "Beagle", 12, 
                    new BigDecimal("350.00"), "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8", 
                    "Curious and merry.", PetStatus.AVAILABLE, dogs));

            petRepository.save(new Pet(null, "Bella", Species.DOG, "Poodle", 48, 
                    new BigDecimal("550.00"), "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7", 
                    "Intelligent and elegant.", PetStatus.AVAILABLE, dogs));

            petRepository.save(new Pet(null, "Oliver", Species.CAT, "Persian", 30, 
                    new BigDecimal("500.00"), "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba", 
                    "Dignified and docile.", PetStatus.AVAILABLE, cats));

            petRepository.save(new Pet(null, "Bubbles", Species.FISH, "Betta", 3, 
                    new BigDecimal("25.00"), "https://images.unsplash.com/photo-1524704659690-3f7a37d9ee23", 
                    "Vibrant and solitary.", PetStatus.AVAILABLE, fishes));

            petRepository.save(new Pet(null, "Sunny", Species.BIRD, "Cockatiel", 12, 
                    new BigDecimal("75.00"), "https://images.unsplash.com/photo-1522858547137-f1dcec554f55", 
                    "Cheerful whistler.", PetStatus.AVAILABLE, birds));

            petRepository.save(new Pet(null, "Cooper", Species.DOG, "Siberian Husky", 18, 
                    new BigDecimal("850.00"), "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec", 
                    "Energetic and loves the outdoors.", PetStatus.AVAILABLE, dogs));

            petRepository.save(new Pet(null, "Simba", Species.CAT, "Persian White", 24, 
                    new BigDecimal("550.00"), "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba", 
                    "Dignified and very calm.", PetStatus.AVAILABLE, cats));

            petRepository.save(new Pet(null, "Rio", Species.BIRD, "Macaw", 48, 
                    new BigDecimal("1200.00"), "https://images.unsplash.com/photo-1552728089-57bdde30fc3e", 
                    "Majestic and highly intelligent.", PetStatus.AVAILABLE, birds));

            petRepository.save(new Pet(null, "Fin", Species.FISH, "Discus Fish", 8, 
                    new BigDecimal("45.00"), "https://images.unsplash.com/photo-1544551763-46a013bb70d5", 
                    "Beautifully colored tropical fish.", PetStatus.AVAILABLE, fishes));
        }
    }
}
