package com.example.Backend_ProjetTicket_OCP.Repo;

import com.example.Backend_ProjetTicket_OCP.Entite.Installation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstallationRepository extends JpaRepository<Installation, Long> {

    //**********these apis will be in the tickets repo***********

    /*
    @Query("SELECT t.installation.nomInstallation, COUNT(t) " +
            "FROM Ticket t " +
            "GROUP BY t.installation.nomInstallation")
    List<Object[]> countTicketsByInstallation();

    @Query("SELECT t.gravite, COUNT(t) FROM Ticket t GROUP BY t.gravite")
    List<Object[]> countTicketsByGravite();

    @Query("SELECT t.type, COUNT(t) FROM Ticket t GROUP BY t.type")
    List<Object[]> countTicketsByType();

    @Query("SELECT t.installation.nomInstallation, t.installation.localisation, COUNT(t) " +
           "FROM Ticket t " +
           "GROUP BY t.installation.nomInstallation, t.installation.localisation")
    List<Object[]> countTicketsByInstallationWithLocation();



    */


    //*************these apis will be in the equipes repo**********

    /*
    @Query(value = """
        SELECT e.id AS equipeId,
               e.nom AS equipeNom,
               COUNT(st.id_ticket) AS totalTickets,
               SUM(CASE WHEN t.status = 'En cours' THEN 1 ELSE 0 END) AS nbEnCours,
               SUM(CASE WHEN t.status = 'Résolu' THEN 1 ELSE 0 END) AS nbResolus
        FROM equipe e
        LEFT JOIN suivi_ticket st ON e.id = st.id_equipe
        LEFT JOIN ticket t ON st.id_ticket = t.id
        GROUP BY e.id, e.nom
    """, nativeQuery = true)
    List<Object[]> getStatistiquesParEquipe();
     */
}
