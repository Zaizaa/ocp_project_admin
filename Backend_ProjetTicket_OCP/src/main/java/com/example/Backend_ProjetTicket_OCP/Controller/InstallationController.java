package com.example.Backend_ProjetTicket_OCP.Controller;

import com.example.Backend_ProjetTicket_OCP.Entite.Installation;
import com.example.Backend_ProjetTicket_OCP.Service.InstallationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/installations")
public class InstallationController {

    private final InstallationService installationService;

    public InstallationController(InstallationService installationService) {
        this.installationService = installationService;
    }

    @GetMapping
    public List<Installation> getAllInstallations() {
        return installationService.getAll();
    }

    @GetMapping("/{id}")
    public Installation getInstallationById(@PathVariable Long id) {
        return installationService.getById(id);
    }

    @PostMapping
    public Installation createInstallation(@RequestBody Installation installation) {
        return installationService.create(installation);
    }

    @PutMapping("/{id}")
    public Installation updateInstallation(@PathVariable Long id, @RequestBody Installation installation) {
        return installationService.update(id, installation);
    }

    @DeleteMapping("/{id}")
    public void deleteInstallation(@PathVariable Long id) {
        installationService.delete(id);
    }

    //useful apis
    // to get the counts (+2 in the ticket and equipe controller to get their counts)
    @GetMapping("/count")
    public long getInstallationCount() {
        return installationService.countInstallations();
    }


    //********these api will be in the tickets controller**********

    /*
    @GetMapping("/count")
    public long getTicketCount() {
        return ticketService.countTickets();
    }
    @GetMapping("/tickets/count-by-installation")
    public List<Object[]> getTicketCountByInstallation() {
        return ticketService.getTicketCountByInstallation();
    }
    @GetMapping("/tickets/percentage-by-gravite")
    public List<Map<String, Object>> getTicketPercentageByGravite() {
        return ticketService.getTicketPercentageByGravite();
    }
    @GetMapping("/tickets/percentage-by-type")
    public List<Map<String, Object>> getTicketPercentageByType() {
        return ticketService.getTicketPercentageByType();
    }
    @GetMapping("/tickets/count-by-installation-location")
    public List<Object[]> getTicketCountByInstallationWithLocation() {
        return ticketService.getTicketCountByInstallationWithLocation();
    }

    */

    //*********these api will be in the equipes controller***********

    /*
    @GetMapping("/count")
    public long getEquipeCount() {
        return equipeService.countEquipes();
    }
    @GetMapping("/statistiques")
    public List<EquipeStatsDTO> getStatistiques() {
        return equipeService.getStatistiquesParEquipe();
    }

     */

}

