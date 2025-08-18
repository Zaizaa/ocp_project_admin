package com.example.Backend_ProjetTicket_OCP.Service;

import com.example.Backend_ProjetTicket_OCP.Entite.Installation;
import com.example.Backend_ProjetTicket_OCP.Repo.InstallationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstallationService {

    private final InstallationRepository installationRepository;

    public InstallationService(InstallationRepository installationRepository) {
        this.installationRepository = installationRepository;
    }

    public List<Installation> getAll() {
        return installationRepository.findAll();
    }

    public Installation getById(Long id) {
        return installationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Installation non trouvée"));
    }

    public Installation create(Installation installation) {
        return installationRepository.save(installation);
    }

    public Installation update(Long id, Installation updatedInstallation) {
        Installation existing = getById(id);
        existing.setNomInstallation(updatedInstallation.getNomInstallation());
        existing.setLocalisation(updatedInstallation.getLocalisation());
        return installationRepository.save(existing);
    }

    public void delete(Long id) {
        installationRepository.deleteById(id);
    }

    //useful services
    public long countInstallations() {
        return installationRepository.count();
    }

    //*********these api will be in the tickets service**************
    /*
    public long countTickets() {
        return ticketRepository.count();
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

     */

    //***************these api will be in the equipes service**************
    /*
    public long countEquipes() {
        return equipeRepository.count();
    }

    public List<EquipeStatsDTO> getStatistiquesParEquipe() {
        List<Object[]> results = equipeRepository.getStatistiquesParEquipe();
        List<EquipeStatsDTO> stats = new ArrayList<>();

        for (Object[] row : results) {
            stats.add(new EquipeStatsDTO(
                ((Number) row[0]).longValue(), // id
                (String) row[1],               // nom
                ((Number) row[2]).intValue(),  // total
                ((Number) row[3]).intValue(),  // en cours
                ((Number) row[4]).intValue()   // résolus
            ));
        }
        return stats;
    }-

     */

}

