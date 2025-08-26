package com.example.Backend_ProjetTicket_OCP.Entite;

import jakarta.persistence.*;

@Entity
@Table(name = "users") // "user" est mot réservé dans certaines DB
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idUser;

    private String nom;
    private String prenom;
    private String cin;
    private String email;
    private String password;
    private String adresse;
    private String role; // admin, chef équipe, declarant

    // getters/setters
}

