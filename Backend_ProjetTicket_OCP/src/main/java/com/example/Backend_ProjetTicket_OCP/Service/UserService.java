package com.example.Backend_ProjetTicket_OCP.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.Backend_ProjetTicket_OCP.Entite.User;
import com.example.Backend_ProjetTicket_OCP.Repo.UserRepository;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public List<User> obtenirTousLesUsers() {
        return userRepository.findAll();
    }
    
    public User obtenirUserParId(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur avec ID " + id + " non trouvé"));
    }
    
    public Optional<User> rechercherUserParId(Long id) {
        return userRepository.findById(id);
    }
    
    public User creerUser(User user) {
        if (user == null) {
            throw new IllegalArgumentException("L'utilisateur ne peut pas être nul");
        }
        
        // Vérifier l'unicité de l'email
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Un utilisateur avec cet email existe déjà");
        }
        
        // Vérifier l'unicité du CIN
        if (userRepository.existsByCin(user.getCin())) {
            throw new RuntimeException("Un utilisateur avec ce CIN existe déjà");
        }
        
        return userRepository.save(user);
    }
    
    public User mettreAJourUser(Long id, User userModifie) {
        if (userModifie == null) {
            throw new IllegalArgumentException("L'utilisateur modifié ne peut pas être nul");
        }
        
        User existant = obtenirUserParId(id);
        
        // Vérifier l'unicité de l'email si changé
        if (!existant.getEmail().equals(userModifie.getEmail()) && 
            userRepository.existsByEmail(userModifie.getEmail())) {
            throw new RuntimeException("Un utilisateur avec cet email existe déjà");
        }
        
        // Vérifier l'unicité du CIN si changé
        if (!existant.getCin().equals(userModifie.getCin()) && 
            userRepository.existsByCin(userModifie.getCin())) {
            throw new RuntimeException("Un utilisateur avec ce CIN existe déjà");
        }
        
        existant.setNom(userModifie.getNom());
        existant.setPrenom(userModifie.getPrenom());
        existant.setCin(userModifie.getCin());
        existant.setEmail(userModifie.getEmail());
        existant.setAdresse(userModifie.getAdresse());
        existant.setRole(userModifie.getRole());
        
        // Ne pas modifier le mot de passe sauf si fourni
        if (userModifie.getPassword() != null && !userModifie.getPassword().isEmpty()) {
            existant.setPassword(userModifie.getPassword());
        }
        
        return userRepository.save(existant);
    }
    
    public void supprimerUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("Utilisateur avec ID " + id + " non trouvé");
        }
        userRepository.deleteById(id);
    }
    
    public long compterUsers() {
        return userRepository.count();
    }
    
    public List<User> obtenirUsersByRole(String role) {
        return userRepository.findUsersByRole(role);
    }
    
    public List<Object[]> obtenirStatistiquesParRole() {
        return userRepository.countUsersByRole();
    }
    
    public boolean existeParId(Long id) {
        return userRepository.existsById(id);
    }
    
    public Optional<User> rechercherParEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public Optional<User> rechercherParCin(String cin) {
        return userRepository.findByCin(cin);
    }
}
