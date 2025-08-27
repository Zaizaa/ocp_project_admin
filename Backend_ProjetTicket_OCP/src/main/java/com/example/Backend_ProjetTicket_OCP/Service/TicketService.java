package com.example.Backend_ProjetTicket_OCP.Service;


import com.example.Backend_ProjetTicket_OCP.DTO.TicketDTO;

import com.example.Backend_ProjetTicket_OCP.Entite.Ticket;
import com.example.Backend_ProjetTicket_OCP.Repo.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.*;

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

    /*nouhaila*/
    public Map<String, Long> getTicketStats() {
        Map<String, Long> stats = new HashMap<>();

        stats.put("total", ticketRepository.count());
        stats.put("ouvert", ticketRepository.countByStatut("ouvert"));
        stats.put("en_cours", ticketRepository.countByStatut("en cours"));
        stats.put("resolue", ticketRepository.countByStatut("résolue"));
        stats.put("ferme", ticketRepository.countByStatut("fermé"));

        return stats;
    }

    public List<Object[]> getTicketCountByInstallation() {
        return ticketRepository.countTicketsByInstallation();
    }
    public List<Map<String, Object>> getTicketPercentageByGravite() {
        List<Object[]> data = ticketRepository.countTicketsByGravite();
        long total = ticketRepository.count();

        List<Map<String, Object>> result = new ArrayList<>();

        for (Object[] row : data) {
            String gravite = (String) row[0];
            long count = (long) row[1];
            double percentage = (count * 100.0) / total;

            Map<String, Object> map = new HashMap<>();
            map.put("gravite", gravite);
            map.put("percentage", percentage);

            result.add(map);
        }

        return result;
    }
    public List<Map<String, Object>> getTicketPercentageByType() {
        List<Object[]> data = ticketRepository.countTicketsByType();
        long total = ticketRepository.count();

        List<Map<String, Object>> result = new ArrayList<>();

        for (Object[] row : data) {
            String type = (String) row[0];
            long count = (long) row[1];
            double percentage = (count * 100.0) / total;

            Map<String, Object> map = new HashMap<>();
            map.put("type", type);
            map.put("percentage", percentage);

            result.add(map);
        }

        return result;
    }
    public List<Object[]> getTicketCountByInstallationWithLocation() {
        return ticketRepository.countTicketsByInstallationWithLocation();
    }


}

