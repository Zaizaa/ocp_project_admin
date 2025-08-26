package com.example.Backend_ProjetTicket_OCP.Service;

import com.example.Backend_ProjetTicket_OCP.Entite.Equipe;
import com.example.Backend_ProjetTicket_OCP.Repo.EquipeRepository;
import org.springframework.stereotype.Service;

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
}
