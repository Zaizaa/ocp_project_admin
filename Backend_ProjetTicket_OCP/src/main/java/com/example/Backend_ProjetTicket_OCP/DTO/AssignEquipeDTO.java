package com.example.Backend_ProjetTicket_OCP.DTO;

public class AssignEquipeDTO {
    private int ticketId;
    private int equipeId;

    // getters/setters
    public int getTicketId() {
        return ticketId;
    }
    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }
    public int getEquipeId() {
        return equipeId;
    }
    public void setEquipeId(int equipeId) {
        this.equipeId = equipeId;
    }
}
