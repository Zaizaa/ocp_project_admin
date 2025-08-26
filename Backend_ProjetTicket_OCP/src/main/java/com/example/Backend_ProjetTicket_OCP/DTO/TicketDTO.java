package com.example.Backend_ProjetTicket_OCP.DTO;

import java.util.Date;

public class TicketDTO {
    private int id;
    private String declarantNom;
    private String role;
    private String titre;
    private String description;
    private String rapportUrl; // ex: lien vers PDF
    private String fichierUrl; // ex: image
    private String type;
    private String gravite;
    private String localisation;
    private Date dateCreation;
    private String statut;   // DECLARE, EN_COURS, RESOLU
    private String equipeNom; // null si pas encore assigné

    public TicketDTO(int id, String role, String declarantNom, String titre,
                     String description, String rapportUrl, String fichierUrl,
                     String type, String gravite, String localisation,
                     Date dateCreation, String statut, String equipeNom) {
        this.id = id;
        this.role = role;
        this.declarantNom = declarantNom;
        this.titre = titre;
        this.description = description;
        this.rapportUrl = rapportUrl;
        this.fichierUrl = fichierUrl;
        this.type = type;
        this.gravite = gravite;
        this.localisation = localisation;
        this.dateCreation = dateCreation;
        this.statut = statut;
        this.equipeNom = equipeNom;
    }
}
