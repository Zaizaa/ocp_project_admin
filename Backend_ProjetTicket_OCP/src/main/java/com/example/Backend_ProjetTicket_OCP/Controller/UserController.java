package com.example.Backend_ProjetTicket_OCP.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend_ProjetTicket_OCP.Entite.User;
import com.example.Backend_ProjetTicket_OCP.Service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping
    public ResponseEntity<List<User>> obtenirTousLesUsers() {
        try {
            List<User> users = userService.obtenirTousLesUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> obtenirUserParId(@PathVariable Long id) {
        try {
            User user = userService.obtenirUserParId(id);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<Map<String, Object>> creerUser(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        try {
            User userCree = userService.creerUser(user);
            response.put("success", true);
            response.put("message", "Utilisateur créé avec succès");
            response.put("user", userCree);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> mettreAJourUser(@PathVariable Long id, @RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        try {
            User userMisAJour = userService.mettreAJourUser(id, user);
            response.put("success", true);
            response.put("message", "Utilisateur mis à jour avec succès");
            response.put("user", userMisAJour);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> supprimerUser(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            userService.supprimerUser(id);
            response.put("success", true);
            response.put("message", "Utilisateur supprimé avec succès");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> obtenirNombreUsers() {
        long count = userService.compterUsers();
        return ResponseEntity.ok(count);
    }
    
    @GetMapping("/role/{role}")
    public ResponseEntity<List<User>> obtenirUsersByRole(@PathVariable String role) {
        List<User> users = userService.obtenirUsersByRole(role);
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/stats/roles")
    public ResponseEntity<List<Object[]>> obtenirStatistiquesParRole() {
        List<Object[]> stats = userService.obtenirStatistiquesParRole();
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/search/email/{email}")
    public ResponseEntity<User> rechercherParEmail(@PathVariable String email) {
        return userService.rechercherParEmail(email)
                .map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search/cin/{cin}")
    public ResponseEntity<User> rechercherParCin(@PathVariable String cin) {
        return userService.rechercherParCin(cin)
                .map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.notFound().build());
    }
}