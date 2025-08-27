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










     */

    //***************these api will be in the equipes service**************
    /*




     */

}

