package com.example.Backend_ProjetTicket_OCP.Repo;

import com.example.Backend_ProjetTicket_OCP.DTO.TicketDTO;
import com.example.Backend_ProjetTicket_OCP.Entite.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

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
}
