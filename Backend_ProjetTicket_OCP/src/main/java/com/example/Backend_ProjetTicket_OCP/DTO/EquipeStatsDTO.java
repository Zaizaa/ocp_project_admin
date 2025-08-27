package com.example.Backend_ProjetTicket_OCP.DTO;

public class EquipeStatsDTO {
    private int equipeId;
    private String equipeNom;
    private int totalTickets;
    private int nbEnCours;
    private int nbResolus;

    public EquipeStatsDTO() {}

    public EquipeStatsDTO(int equipeId, int totalTickets, int nbEnCours, int nbResolus, String equipeNom) {
        // constructeur alternatif si tu veux, mais le plus utilisé ci-dessous est celui avec tous les champs
    }

    public EquipeStatsDTO(int equipeId, String equipeNom, int totalTickets, int nbEnCours, int nbResolus) {
        this.equipeId = equipeId;
        this.equipeNom = equipeNom;
        this.totalTickets = totalTickets;
        this.nbEnCours = nbEnCours;
        this.nbResolus = nbResolus;
    }

    // getters & setters
    public int getEquipeId() { return equipeId; }
    public void setEquipeId(int equipeId) { this.equipeId = equipeId; }

    public String getEquipeNom() { return equipeNom; }
    public void setEquipeNom(String equipeNom) { this.equipeNom = equipeNom; }

    public int getTotalTickets() { return totalTickets; }
    public void setTotalTickets(int totalTickets) { this.totalTickets = totalTickets; }

    public int getNbEnCours() { return nbEnCours; }
    public void setNbEnCours(int nbEnCours) { this.nbEnCours = nbEnCours; }

    public int getNbResolus() { return nbResolus; }
    public void setNbResolus(int nbResolus) { this.nbResolus = nbResolus; }
}

