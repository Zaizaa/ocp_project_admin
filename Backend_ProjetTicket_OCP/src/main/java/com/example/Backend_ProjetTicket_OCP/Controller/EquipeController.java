package com.example.Backend_ProjetTicket_OCP.Controller;

import com.example.Backend_ProjetTicket_OCP.DTO.EquipeStatsDTO;
import com.example.Backend_ProjetTicket_OCP.Entite.Equipe;
import com.example.Backend_ProjetTicket_OCP.Service.EquipeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipes")
@CrossOrigin(origins = "http://localhost:3000") // autoriser ton front
public class EquipeController {

    private final EquipeService equipeService;

    public EquipeController(EquipeService equipeService) {
        this.equipeService = equipeService;
    }

    @GetMapping
    public List<Equipe> getAllEquipes() {
        return equipeService.getAllEquipes();
    }

    @GetMapping("/{id}")
    public Equipe getEquipe(@PathVariable int id) {
        return equipeService.getEquipeById(id);
    }

    @PostMapping
    public Equipe createEquipe(@RequestBody Equipe equipe) {
        return equipeService.createEquipe(equipe);
    }

    @DeleteMapping("/{id}")
    public void deleteEquipe(@PathVariable int id) {
        equipeService.deleteEquipe(id);
    }

    /*nouhaila*/
    @GetMapping("/count")
    public long getEquipeCount() {
        return equipeService.countEquipes();
    }
    @GetMapping("/statistiques")
    public List<EquipeStatsDTO> getStatistiques() {
        return equipeService.getStatistiquesParEquipe();
    }
}
