package com.example.Backend_ProjetTicket_OCP.Repo;


import com.example.Backend_ProjetTicket_OCP.DTO.TicketDTO;
import com.example.Backend_ProjetTicket_OCP.Entite.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {

    @Query("SELECT new com.example.Backend_ProjetTicket_OCP.DTO.TicketDTO(" +
            "t.idTicket, u.role, u.nom, t.titre, t.description, " +
            "st.rapportResolution, t.file, t.type, t.gravite, " +
            "i.localisation, t.dateCreation, t.statut, e.equipeNom) " +
            "FROM Ticket t " +
            "JOIN t.declarant u " +
            "JOIN t.installation i " +
            "LEFT JOIN SuiviTicket st ON st.ticket.idTicket = t.idTicket " +
            "LEFT JOIN Equipe e ON st.equipe.idEquipe = e.idEquipe"
    )
    List<TicketDTO> findAllTicketsWithDetails();

    /*nouhaila*/
    @Query("SELECT t.installation.nomInstallation, COUNT(t) " +
            "FROM Ticket t " +
            "GROUP BY t.installation.nomInstallation")
    List<Object[]> countTicketsByInstallation();

    @Query("SELECT t.gravite, COUNT(t) FROM Ticket t GROUP BY t.gravite")
    List<Object[]> countTicketsByGravite();

    @Query("SELECT t.type, COUNT(t) FROM Ticket t GROUP BY t.type")
    List<Object[]> countTicketsByType();

    @Query("SELECT t.installation.nomInstallation, t.installation.localisation, COUNT(t) " +
            "FROM Ticket t " +
            "GROUP BY t.installation.nomInstallation, t.installation.localisation")
    List<Object[]> countTicketsByInstallationWithLocation();

    /*correction*/
    long countByStatut(String statut);



}

