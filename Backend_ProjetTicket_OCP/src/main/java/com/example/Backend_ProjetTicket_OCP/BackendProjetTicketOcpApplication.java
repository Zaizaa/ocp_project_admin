package com.example.Backend_ProjetTicket_OCP;

import com.example.Backend_ProjetTicket_OCP.Entite.Installation;
import com.example.Backend_ProjetTicket_OCP.Repo.InstallationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

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

}
