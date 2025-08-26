package com.example.Backend_ProjetTicket_OCP.Service;

import com.example.Backend_ProjetTicket_OCP.DTO.SuiviTicketDTO;
import com.example.Backend_ProjetTicket_OCP.DTO.TicketDTO;
import com.example.Backend_ProjetTicket_OCP.Entite.Equipe;
import com.example.Backend_ProjetTicket_OCP.Entite.SuiviTicket;
import com.example.Backend_ProjetTicket_OCP.Entite.Ticket;
import com.example.Backend_ProjetTicket_OCP.Repo.EquipeRepository;
import com.example.Backend_ProjetTicket_OCP.Repo.SuiviTicketRepository;
import com.example.Backend_ProjetTicket_OCP.Repo.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SuiviTicketService {
    private final SuiviTicketRepository suiviTicketRepository;
    private final TicketRepository ticketRepository;
    private final EquipeRepository equipeRepository;

    public SuiviTicketService(SuiviTicketRepository suiviTicketRepository,
                              TicketRepository ticketRepository,
                              EquipeRepository equipeRepository) {
        this.suiviTicketRepository = suiviTicketRepository;
        this.ticketRepository = ticketRepository;
        this.equipeRepository = equipeRepository;
    }



    public SuiviTicketDTO assignTicketToEquipe(int ticketId, Long equipeId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        Equipe equipe = equipeRepository.findById(equipeId)
                .orElseThrow(() -> new RuntimeException("Equipe not found"));

        SuiviTicket suiviTicket = new SuiviTicket();
        suiviTicket.setTicket(ticket);
        suiviTicket.setEquipe(equipe);
        suiviTicket.setDateStart(new Date());

        suiviTicket = suiviTicketRepository.save(suiviTicket);

        // Mise à jour statut ticket
        ticket.setStatut("Ouvert");
        ticketRepository.save(ticket);

        return convertToDTO(suiviTicket);
    }

    public SuiviTicketDTO closeTicket(Long suiviId, String rapport) {
        SuiviTicket suivi = suiviTicketRepository.findById(suiviId)
                .orElseThrow(() -> new RuntimeException("Suivi not found"));

        suivi.setRapportResolution(rapport);
        suivi.setDateFin(new Date());

        suivi = suiviTicketRepository.save(suivi);

        // Mise à jour statut ticket
        Ticket ticket = suivi.getTicket();
        ticket.setStatut("RESOLU");
        ticketRepository.save(ticket);

        return convertToDTO(suivi);
    }

    private SuiviTicketDTO convertToDTO(SuiviTicket suivi) {
        SuiviTicketDTO dto = new SuiviTicketDTO();
        dto.setId(suivi.getId());
        dto.setTicketId(suivi.getTicket().getIdTicket());
        dto.setEquipeId(suivi.getEquipe().getIdEquipe());
        dto.setRapportResolution(suivi.getRapportResolution());
        dto.setDateStart(suivi.getDateStart());
        dto.setDateFin(suivi.getDateFin());
        return dto;
    }
}
