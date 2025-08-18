package com.example.Backend_ProjetTicket_OCP.Entite;

import jakarta.persistence.*;

@Entity
public class Installation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idInstallation;

    private String nomInstallation;

    private String localisation;


    public Installation() {}

    public Installation(String nomInstallation, String localisation) {
        this.nomInstallation = nomInstallation;
        this.localisation = localisation;
    }

    public Long getIdInstallation() {
        return idInstallation;
    }

    public void setIdInstallation(Long idInstallation) {
        this.idInstallation = idInstallation;
    }

    public String getNomInstallation() {
        return nomInstallation;
    }

    public void setNomInstallation(String nomInstallation) {
        this.nomInstallation = nomInstallation;
    }

    public String getLocalisation() {
        return localisation;
    }

    public void setLocalisation(String localisation) {
        this.localisation = localisation;
    }
}
