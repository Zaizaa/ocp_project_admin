package com.example.Backend_ProjetTicket_OCP.Service;

import com.example.Backend_ProjetTicket_OCP.Entite.Ticket;
import com.example.Backend_ProjetTicket_OCP.Repo.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Optional<Ticket> getTicketById(int id) {
        return ticketRepository.findById(id);
    }

    public Ticket createTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public Ticket updateTicket(int id, Ticket updatedTicket) {
        return ticketRepository.findById(id)
                .map(ticket -> {
                    ticket.setNumber(updatedTicket.getNumber());
                    ticket.setTitre(updatedTicket.getTitre());
                    ticket.setType(updatedTicket.getType());
                    ticket.setGravite(updatedTicket.getGravite());
                    ticket.setDescription(updatedTicket.getDescription());
                    ticket.setFile(updatedTicket.getFile());

                    ticket.setStatut(updatedTicket.getStatut());
                    ticket.setDateCreation(updatedTicket.getDateCreation());
                    ticket.setInstallation(updatedTicket.getInstallation());


                    return ticketRepository.save(ticket);
                })
                .orElse(null);
    }

    public void deleteTicket(int id) {
        ticketRepository.deleteById(id);
    }
    public void deleteAllTickets() {
        ticketRepository.deleteAll();
    }
}
