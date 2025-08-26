package com.example.Backend_ProjetTicket_OCP.Entite;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Equipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEquipe;

    private boolean disponibilite;

    // Relation avec User (chef d'équipe)
    @ManyToOne
    @JoinColumn(name = "id_chef_equipe")
    private User chefEquipe;

    // Relation avec User (membres de l'équipe)
    @ManyToMany
    @JoinTable(
            name = "membresEquipe",
            joinColumns = @JoinColumn(name = "idEquipe"),
            inverseJoinColumns = @JoinColumn(name = "idUser")
    )
    private List<User> membres;

    // Constructeur par défaut
    public Equipe() {}

    // Constructeur avec paramètres
    public Equipe(boolean disponibilite, User chefEquipe, List<User> membres) {
        this.disponibilite = disponibilite;
        this.chefEquipe = chefEquipe;
        this.membres = membres;
    }

    // Getters et Setters
    public Long getIdEquipe() {
        return idEquipe;
    }

    public void setIdEquipe(Long idEquipe) {
        this.idEquipe = idEquipe;
    }

    public boolean isDisponibilite() {
        return disponibilite;
    }

    public void setDisponibilite(boolean disponibilite) {
        this.disponibilite = disponibilite;
    }

    public User getChefEquipe() {
        return chefEquipe;
    }

    public void setChefEquipe(User chefEquipe) {
        this.chefEquipe = chefEquipe;
    }

    public List<User> getMembres() {
        return membres;
    }

    public void setMembres(List<User> membres) {
        this.membres = membres;
    }
}
