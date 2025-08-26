'use client';

import { useState } from 'react';
import { Users, Edit, Trash2, Plus, X, Crown } from 'lucide-react';

interface Team {
  id: number;
  name: string;
  description: string;
  leader: string;
  leaderRole: string;
  members: string[];
  memberCount: number;
  createdDate: string;
}

interface CreateTeamForm {
  name: string;
  description: string;
  leader: string;
  department: string;
}

export default function GestionEquipes() {
  const [teams, setTeams] = useState<Team[]>([
    {
      id: 1,
      name: "Support Technique",
      description: "Équipe responsable du support technique niveau 1 et 2",
      leader: "Jean Dupont",
      leaderRole: "IT",
      members: ["Alice Martin", "Bob Wilson", "Claire Dubois"],
      memberCount: 3,
      createdDate: "15/01/2024"
    },
    {
      id: 2,
      name: "Support Client",
      description: "Équipe dédiée au support client et à la relation clientèle",
      leader: "Marie Leroy",
      leaderRole: "Customer Service",
      members: ["David Chen", "Emma Brown", "Frank Miller"],
      memberCount: 4,
      createdDate: "20/01/2024"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CreateTeamForm>({
    name: '',
    description: '',
    leader: '',
    department: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateTeam = () => {
    if (formData.name && formData.description && formData.leader && formData.department) {
      const newTeam: Team = {
        id: teams.length + 1,
        name: formData.name,
        description: formData.description,
        leader: formData.leader,
        leaderRole: formData.department,
        members: [],
        memberCount: 0,
        createdDate: new Date().toLocaleDateString('fr-FR')
      };
      
      setTeams([...teams, newTeam]);
      setFormData({ name: '', description: '', leader: '', department: '' });
      setShowForm(false);
    }
  };

  const handleDeleteTeam = (teamId: number) => {
    setTeams(teams.filter(team => team.id !== teamId));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gestion des Équipes</h1>
          <p className="text-gray-600">Créez et gérez les équipes de votre helpdesk</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <Plus size={20} />
          Créer une Équipe
        </button>
      </div>

      {/* Formulaire */}
      {showForm && (
        <div className="mb-6 bg-white rounded-lg shadow border">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Créer une Nouvelle Équipe</h2>
                <p className="text-gray-600 mt-1">Remplissez les informations pour créer une nouvelle équipe</p>
              </div>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                aria-label="Fermer le formulaire"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Section Informations Générales */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Informations Générales</h3>
                <div className="space-y-4">
                  {/* Team Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de l&apos;équipe *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ex: Support Technique"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Description de l&apos;équipe et de ses responsabilités..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section Leadership */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Leadership et Organisation</h3>
                <div className="space-y-4">
                  {/* Team Leader */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Crown className="inline w-4 h-4 mr-1 text-yellow-500" />
                      Chef d&apos;équipe *
                    </label>
                    <select
                      name="leader"
                      value={formData.leader}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="">Sélectionner un chef d&apos;équipe</option>
                      <option value="Jean Dupont">Jean Dupont</option>
                      <option value="Marie Leroy">Marie Leroy</option>
                      <option value="Pierre Martin">Pierre Martin</option>
                      <option value="Sophie Dubois">Sophie Dubois</option>
                      <option value="Thomas Wilson">Thomas Wilson</option>
                    </select>
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Département *
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="">Sélectionner un département</option>
                      <option value="IT">IT</option>
                      <option value="Customer Service">Customer Service</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="HR">Ressources Humaines</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Info:</strong> Une fois créée, vous pourrez ajouter des membres à cette équipe depuis la gestion des utilisateurs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions du formulaire */}
            <div className="flex justify-between items-center gap-4 mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">* Champs obligatoires</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreateTeam}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-medium shadow-sm"
                >
                  Créer l&apos;Équipe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Teams Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div key={team.id} className="bg-white rounded-lg shadow border p-6 hover:shadow-md transition-shadow">
            {/* Team Header */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{team.name}</h3>
              <div className="flex gap-2">
                <button 
                  aria-label="Modifier l'équipe"
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleDeleteTeam(team.id)}
                  aria-label="Supprimer l'équipe"
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Team Description */}
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{team.description}</p>

            {/* Team Leader */}
            <div className="flex items-center gap-2 mb-4 p-2 bg-yellow-50 rounded-lg">
              <Crown className="text-yellow-500" size={18} />
              <span className="font-medium text-gray-900 text-sm">{team.leader}</span>
              <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                {team.leaderRole}
              </span>
            </div>

            {/* Members Count */}
            <div className="flex items-center gap-2 mb-4">
              <Users className="text-gray-400" size={18} />
              <span className="text-gray-600 text-sm">
                {team.memberCount} membre{team.memberCount > 1 ? 's' : ''}
              </span>
            </div>

            {/* Members List */}
            {team.members.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Membres :</p>
                <div className="flex flex-wrap gap-1">
                  {team.members.slice(0, 3).map((member, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      {member}
                    </span>
                  ))}
                  {team.members.length > 3 && (
                    <span className="text-xs text-gray-500 px-2 py-1">
                      +{team.members.length - 3} autres
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Created Date */}
            <div className="pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Créée le {team.createdDate}
              </p>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {teams.length === 0 && (
          <div className="col-span-full flex items-center justify-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune équipe</h3>
              <p className="text-gray-600 mb-4">Commencez par créer votre première équipe</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors mx-auto"
              >
                <Plus size={20} />
                Créer une Équipe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
