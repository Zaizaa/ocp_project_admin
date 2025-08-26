package com.example.Backend_ProjetTicket_OCP.Entite;


import jakarta.persistence.*;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id; // <-- CORRECT import


import java.util.Date;

@Entity
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idTicket;
    private String number;
    private String titre;
    private String type;
    private String gravite; // faible, moyenne, haute, critique
    private String description;
    private String file; // lien ou chemin vers un fichier
    private String statut; // ouvert, en cours, résolue, fermé

    @ManyToOne
    @JoinColumn(name = "installation_id") // clé étrangère dans Ticket
    private Installation installation;
    private Date dateCreation;


    //ajout id declarant
    //Relation avec User (déclarant)
    @ManyToOne
    @JoinColumn(name = "idUser", nullable = false)
    private User declarant;





    public Ticket() {}

    public Ticket(int idTicket, String number, String titre, String type, String gravite, String description, String file,
                  String statut, Installation installation,  Date dateCreation) {
        this.idTicket = idTicket;
        this.number = number;
        this.titre = titre;
        this.type = type;
        this.gravite = gravite;
        this.description = description;
        this.file = file;
        this.statut = statut;
        this.installation = installation;
        this.dateCreation = dateCreation;
    }

    // Getters et Setters
    public int getIdTicket() { return idTicket; }
    public void setIdTicket(int idTicket) { this.idTicket = idTicket; }
    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }
    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getGravite() { return gravite; }
    public void setGravite(String gravite) { this.gravite = gravite; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getFile() { return file; }
    public void setFile(String file) { this.file = file; }
    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }
    public Installation getInstallation() { return installation; }
    public void setInstallation(Installation installation) { this.installation = installation; }
    public Date getDateCreation() { return dateCreation; }
    public void setDateCreation(Date dateCreation) { this.dateCreation = dateCreation; }


    public User getDeclarant() { return declarant; }
    public void setDeclarant(User declarant) { this.declarant = declarant; }


}

