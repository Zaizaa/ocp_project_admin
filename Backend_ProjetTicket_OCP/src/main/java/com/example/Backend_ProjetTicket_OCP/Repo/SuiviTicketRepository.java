package com.example.Backend_ProjetTicket_OCP.Repo;

import com.example.Backend_ProjetTicket_OCP.Entite.SuiviTicket;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuiviTicketRepository extends JpaRepository<SuiviTicket, Long> {
}


