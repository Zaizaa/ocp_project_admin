package com.example.Backend_ProjetTicket_OCP;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.Backend_ProjetTicket_OCP.Entite.Installation;
import com.example.Backend_ProjetTicket_OCP.Entite.User;
import com.example.Backend_ProjetTicket_OCP.Repo.InstallationRepository;
import com.example.Backend_ProjetTicket_OCP.Repo.UserRepository;

@SpringBootApplication
public class BackendProjetTicketOcpApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(BackendProjetTicketOcpApplication.class, args);
    }
    
    @Bean
    CommandLineRunner initDatabase(InstallationRepository installationRepository) {
        return args -> {
            if (installationRepository.count() == 0) {
                installationRepository.save(new Installation("Station de pompage", "Zone Nord"));
                installationRepository.save(new Installation("Centrale électrique", "Zone Sud"));
                installationRepository.save(new Installation("Atelier mécanique", "Zone Est"));
                installationRepository.save(new Installation("Poste de sécurité", "Zone Ouest"));
                installationRepository.save(new Installation("Zone de stockage", "Centre"));
            }
        };
    }
    
    // Initialisation des utilisateurs
    @Bean
    CommandLineRunner initUserDatabase(UserRepository userRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                userRepository.save(new User("HADADIA", "Salma", "AB123456", "Salma.HADADIA@email.com", "password123", "123 Rue de la Paix", "admin"));
                userRepository.save(new User("ZAGRAHI", "Nouhaila", "AB123457", "Nouhaila.ZAGRAHI@email.com", "password123", "123 Rue de la Paix", "admin"));
                userRepository.save(new User("ZAIZAA", "Hanaa", "CD789012", "Hanaa.ZAIZAA@email.com", "password123", "456 Avenue des Champs", "chef équipe"));
                userRepository.save(new User("MOUNIR", "Loubna", "EF345678", "Loubna.MOUNIR@email.com", "password123", "789 Boulevard Central", "declarant"));
            }
        };
    }
}