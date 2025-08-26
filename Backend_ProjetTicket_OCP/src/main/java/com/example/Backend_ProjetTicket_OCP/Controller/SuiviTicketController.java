package com.example.Backend_ProjetTicket_OCP.Controller;

import com.example.Backend_ProjetTicket_OCP.DTO.SuiviTicketDTO;
import com.example.Backend_ProjetTicket_OCP.DTO.TicketDTO;
import com.example.Backend_ProjetTicket_OCP.Service.SuiviTicketService;
import com.example.Backend_ProjetTicket_OCP.Service.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suivi-tickets")
public class SuiviTicketController {
    private final SuiviTicketService suiviTicketService;


    public SuiviTicketController(SuiviTicketService suiviTicketService) {
        this.suiviTicketService = suiviTicketService;
    }



    @PostMapping("/assign/{ticketId}/to/{equipeId}")
    public SuiviTicketDTO assignTicket(@PathVariable Long ticketId, @PathVariable Long equipeId) {
        return suiviTicketService.assignTicketToEquipe(ticketId, equipeId);
    }

    @PostMapping("/close/{suiviId}")
    public SuiviTicketDTO closeTicket(@PathVariable Long suiviId,
                                      @RequestParam String rapport) {
        return suiviTicketService.closeTicket(suiviId, rapport);
    }
}
