package com.example.Backend_ProjetTicket_OCP.DTO;

public class EquipeStatsDTO {
    private Long equipeId;
    private String equipeNom;
    private int totalTickets;
    private int nbEnCours;
    private int nbResolus;

    public EquipeStatsDTO() {
    }

    public EquipeStatsDTO(Long equipeId, int totalTickets, String equipeNom, int nbEnCours, int nbResolus) {
        this.equipeId = equipeId;
        this.totalTickets = totalTickets;
        this.equipeNom = equipeNom;
        this.nbEnCours = nbEnCours;
        this.nbResolus = nbResolus;
    }

    public Long getEquipeId() {
        return equipeId;
    }

    public String getEquipeNom() {
        return equipeNom;
    }

    public int getNbEnCours() {
        return nbEnCours;
    }

    public int getTotalTickets() {
        return totalTickets;
    }

    public int getNbResolus() {
        return nbResolus;
    }

    public void setEquipeId(Long equipeId) {
        this.equipeId = equipeId;
    }

    public void setEquipeNom(String equipeNom) {
        this.equipeNom = equipeNom;
    }

    public void setTotalTickets(int totalTickets) {
        this.totalTickets = totalTickets;
    }

    public void setNbEnCours(int nbEnCours) {
        this.nbEnCours = nbEnCours;
    }

    public void setNbResolus(int nbResolus) {
        this.nbResolus = nbResolus;
    }
}
