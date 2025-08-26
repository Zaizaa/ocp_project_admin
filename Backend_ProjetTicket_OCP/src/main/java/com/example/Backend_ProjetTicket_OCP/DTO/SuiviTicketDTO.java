package com.example.Backend_ProjetTicket_OCP.DTO;

import java.util.Date;

public class SuiviTicketDTO {
    private int id;
    private int ticketId;
    private int equipeId;
    private String rapportResolution;
    private Date dateStart;
    private Date dateFin;

    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getTicketId() { return ticketId; }
    public void setTicketId(int ticketId) { this.ticketId = ticketId; }

    public int getEquipeId() { return equipeId; }
    public void setEquipeId(int equipeId) { this.equipeId = equipeId; }

    public String getRapportResolution() { return rapportResolution; }
    public void setRapportResolution(String rapportResolution) { this.rapportResolution = rapportResolution; }

    public Date getDateStart() { return dateStart; }
    public void setDateStart(Date dateStart) { this.dateStart = dateStart; }

    public Date getDateFin() { return dateFin; }
    public void setDateFin(Date dateFin) { this.dateFin = dateFin; }
}
