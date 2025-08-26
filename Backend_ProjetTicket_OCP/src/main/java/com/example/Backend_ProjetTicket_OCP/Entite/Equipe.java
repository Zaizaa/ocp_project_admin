package com.example.Backend_ProjetTicket_OCP.Entite;


    import jakarta.persistence.*;

    @Entity
    public class Equipe {

        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int idEquipe;

        private boolean disponibilite;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "id_chef")
        private User chefEquipe;

        private String equipeNom;



        // getters/setters

        public int getIdEquipe() {
            return idEquipe;
        }

        public void setIdEquipe(int idEquipe) {
            this.idEquipe = idEquipe;
        }

    }


