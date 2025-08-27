package com.example.Backend_ProjetTicket_OCP.Repo;

import com.example.Backend_ProjetTicket_OCP.DTO.EquipeStatsDTO;
import com.example.Backend_ProjetTicket_OCP.Entite.Equipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EquipeRepository extends JpaRepository<Equipe, Integer> {
    /*nouhaila*/
    /*
    @Query(value = """
    SELECT e.id_equipe AS idEquipe,
           e.nom AS equipeNom,
           COUNT(st.id_ticket) AS totalTickets,
           SUM(CASE WHEN t.statut = 'en cours' THEN 1 ELSE 0 END) AS nbEnCours,
           SUM(CASE WHEN t.statut = 'résolue' THEN 1 ELSE 0 END) AS nbResolus
    FROM equipe e
    LEFT JOIN suivi_ticket st ON e.id_equipe = st.id_equipe
    LEFT JOIN ticket t ON st.id_ticket = t.id_ticket
    GROUP BY e.id_equipe, e.nom
    """, nativeQuery = true)
    List<Object[]> getStatistiquesParEquipe();
     */

    @Query(value =
            "SELECT e.id_equipe, e.equipe_nom, " +
                    "       COUNT(st.id_ticket) AS totalTickets, " +
                    "       SUM(CASE WHEN t.statut = 'en cours' THEN 1 ELSE 0 END) AS nbEnCours, " +
                    "       SUM(CASE WHEN t.statut = 'résolue' THEN 1 ELSE 0 END) AS nbResolus " +
                    "FROM equipe e " +
                    "LEFT JOIN suivi_ticket st ON st.id_equipe = e.id_equipe " +
                    "LEFT JOIN ticket t ON t.id_ticket = st.id_ticket " +
                    "GROUP BY e.id_equipe, e.equipe_nom",
            nativeQuery = true)
    List<Object[]> findEquipeStatsNative();
}

