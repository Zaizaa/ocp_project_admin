package com.example.Backend_ProjetTicket_OCP.Entite;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(
        name = "suivi_ticket",
        uniqueConstraints = @UniqueConstraint(name = "uk_suivi_ticket_ticket", columnNames = "id_ticket")
)
public class SuiviTicket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_ticket", nullable = false)
    private Ticket ticket;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_equipe", nullable = false)
    private Equipe equipe;

    @Column(length = 2000)
    private String rapportResolution;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateStart;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateFin;

    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public Ticket getTicket() { return ticket; }
    public void setTicket(Ticket ticket) { this.ticket = ticket; }

    public Equipe getEquipe() { return equipe; }
    public void setEquipe(Equipe equipe) { this.equipe = equipe; }

    public String getRapportResolution() { return rapportResolution; }
    public void setRapportResolution(String rapportResolution) { this.rapportResolution = rapportResolution; }

    public Date getDateStart() { return dateStart; }
    public void setDateStart(Date dateStart) { this.dateStart = dateStart; }

    public Date getDateFin() { return dateFin; }
    public void setDateFin(Date dateFin) { this.dateFin = dateFin; }
}
