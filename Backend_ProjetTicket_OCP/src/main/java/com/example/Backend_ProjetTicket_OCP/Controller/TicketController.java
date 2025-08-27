package com.example.Backend_ProjetTicket_OCP.Controller;


import com.example.Backend_ProjetTicket_OCP.DTO.TicketDTO;

import com.example.Backend_ProjetTicket_OCP.Entite.Ticket;
import com.example.Backend_ProjetTicket_OCP.Service.TicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/{id}")
    public Optional<Ticket> getTicketById(@PathVariable int id) {
        return ticketService.getTicketById(id);
    }

    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketService.createTicket(ticket);
    }

    @PutMapping("/{id}")
    public Ticket updateTicket(@PathVariable int id, @RequestBody Ticket ticket) {
        return ticketService.updateTicket(id, ticket);
    }

    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable int id) {
        ticketService.deleteTicket(id);
    }
    @DeleteMapping
    public void deleteAllTickets() {
        ticketService.deleteAllTickets();
    }

    /*nouhaila*/
    @GetMapping("/count")
    public Map<String, Long> getTicketStats() {
        return ticketService.getTicketStats();
    }
    @GetMapping("/count-by-installation")
    public List<Object[]> getTicketCountByInstallation() {
        return ticketService.getTicketCountByInstallation();
    }
    @GetMapping("/percentage-by-gravite")
    public List<Map<String, Object>> getTicketPercentageByGravite() {
        return ticketService.getTicketPercentageByGravite();
    }
    @GetMapping("/percentage-by-type")
    public List<Map<String, Object>> getTicketPercentageByType() {
        return ticketService.getTicketPercentageByType();
    }
    @GetMapping("/count-by-installation-location")
    public List<Object[]> getTicketCountByInstallationWithLocation() {
        return ticketService.getTicketCountByInstallationWithLocation();
    }









}



