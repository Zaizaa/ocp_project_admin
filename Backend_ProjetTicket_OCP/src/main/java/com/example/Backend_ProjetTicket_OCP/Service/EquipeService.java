package com.example.Backend_ProjetTicket_OCP.Service;

import com.example.Backend_ProjetTicket_OCP.DTO.EquipeStatsDTO;
import com.example.Backend_ProjetTicket_OCP.Entite.Equipe;
import com.example.Backend_ProjetTicket_OCP.Repo.EquipeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class EquipeService {

    private final EquipeRepository equipeRepository;

    public EquipeService(EquipeRepository equipeRepository) {
        this.equipeRepository = equipeRepository;
    }

    public List<Equipe> getAllEquipes() {
        return equipeRepository.findAll();
    }

    public Equipe createEquipe(Equipe equipe) {
        return equipeRepository.save(equipe);
    }

    public Equipe getEquipeById(int id) {
        return equipeRepository.findById(id).orElse(null);
    }

    public void deleteEquipe(int id) {
        equipeRepository.deleteById(id);
    }

    /*nouhaila*/
    public long countEquipes() {
        return equipeRepository.count();
    }
    /*
    public List<EquipeStatsDTO> getStatistiquesParEquipe() {
        List<Object[]> results = equipeRepository.getStatistiquesParEquipe();
        List<EquipeStatsDTO> stats = new ArrayList<>();

        for (Object[] row : results) {
            stats.add(new EquipeStatsDTO(
                    ((Number) row[0]).intValue(), // idEquipe
                    ((Number) row[1]).intValue(),
                    (String) row[2],              // equipeNom
                    ((Number) row[3]).intValue(), // nbEnCours
                    ((Number) row[4]).intValue()  // nbResolus
            ));
        }

        return stats;
    }*/
    /*
    public List<EquipeStatsDTO> getStatistiquesParEquipe() {
        List<Object[]> results = equipeRepository.getStatistiquesParEquipe();
        List<EquipeStatsDTO> stats = new ArrayList<>();

        for (Object[] row : results) {
            stats.add(new EquipeStatsDTO(
                    ((Number) row[0]).intValue(), // idEquipe
                    ((Number) row[1]).intValue(),
                    (String) row[2],              // equipeNom
                    ((Number) row[3]).intValue(), // nbEnCours
                    ((Number) row[4]).intValue()  // nbResolus
            ));
        }

        return stats;
    }
     */

    @Transactional(readOnly = true)
    public List<EquipeStatsDTO> getStatistiquesParEquipe() {
        List<Object[]> rows = equipeRepository.findEquipeStatsNative();
        List<EquipeStatsDTO> result = new ArrayList<>();

        for (Object[] row : rows) {
            // ordre des colonnes renvoyées par la requête native :
            // row[0] => id_equipe
            // row[1] => equipe_nom
            // row[2] => totalTickets
            // row[3] => nbEnCours
            // row[4] => nbResolus

            int id = row[0] != null ? ((Number) row[0]).intValue() : 0;
            String nom = row[1] != null ? row[1].toString() : null;
            int total = row[2] != null ? ((Number) row[2]).intValue() : 0;
            int enCours = row[3] != null ? ((Number) row[3]).intValue() : 0;
            int resolus = row[4] != null ? ((Number) row[4]).intValue() : 0;

            result.add(new EquipeStatsDTO(id, nom, total, enCours, resolus));
        }

        return result;
    }
}
