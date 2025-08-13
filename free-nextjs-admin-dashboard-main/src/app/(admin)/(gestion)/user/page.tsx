'use client';

import { useState } from 'react';
import { Plus, Edit, UserX, Trash2, X, Mail, Phone } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  team: string;
  department: string;
  status: 'Actif' | 'Inactif';
  avatar: string;
}

interface CreateUserForm {
  name: string;
  email: string;
  phone: string;
  role: string;
  team: string;
  department: string;
}

export default function GestionUtilisateurs() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Alice Martin",
      email: "alice.martin@company.com",
      phone: "+33 1 23 45 67 89",
      role: "Agent Support",
      team: "Support Technique",
      department: "IT",
      status: "Actif",
      avatar: "AM"
    },
    {
      id: 2,
      name: "Bob Wilson",
      email: "bob.wilson@company.com",
      phone: "+33 1 23 45 67 90",
      role: "Agent Support",
      team: "Support Technique",
      department: "IT",
      status: "Actif",
      avatar: "BW"
    },
    {
      id: 3,
      name: "Claire Dubois",
      email: "claire.dubois@company.com",
      phone: "+33 1 23 45 67 91",
      role: "Agent Senior",
      team: "Support Technique",
      department: "IT",
      status: "Actif",
      avatar: "CD"
    },
    {
      id: 4,
      name: "David Chen",
      email: "david.chen@company.com",
      phone: "+33 1 23 45 67 92",
      role: "Agent Support",
      team: "Support Client",
      department: "Customer Service",
      status: "Actif",
      avatar: "DC"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CreateUserForm>({
    name: '',
    email: '',
    phone: '',
    role: '',
    team: '',
    department: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateUser = () => {
    if (formData.name && formData.email && formData.role && formData.team && formData.department) {
      const newUser: User = {
        id: users.length + 1,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        team: formData.team,
        department: formData.department,
        status: 'Actif',
        avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase()
      };
      
      setUsers([...users, newUser]);
      setFormData({ name: '', email: '', phone: '', role: '', team: '', department: '' });
      setShowForm(false);
    }
  };

  const handleToggleStatus = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Actif' ? 'Inactif' : 'Actif' } 
        : user
    ));
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gestion des Utilisateurs</h1>
          <p className="text-gray-600">Créez et gérez les utilisateurs de votre helpdesk</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <Plus size={20} />
          Ajouter un Utilisateur
        </button>
      </div>

      {/* Formulaire sous le header */}
      {showForm && (
        <div className="mb-6 bg-white rounded-lg shadow border">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Ajouter un Nouvel Utilisateur</h2>
                <p className="text-gray-600 mt-1">Remplissez les informations pour créer un nouvel utilisateur</p>
              </div>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Section Informations Personnelles */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Informations Personnelles</h3>
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ex: Jean Dupont"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jean.dupont@company.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+33 1 23 45 67 89"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Section Informations Professionnelles */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Informations Professionnelles</h3>
                <div className="space-y-4">
                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rôle *
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="">Sélectionner un rôle</option>
                      <option value="Agent Support">Agent Support</option>
                      <option value="Agent Senior">Agent Senior</option>
                      <option value="Chef d'équipe">Chef d'équipe</option>
                      <option value="Administrateur">Administrateur</option>
                    </select>
                  </div>

                  {/* Team */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Équipe *
                    </label>
                    <select
                      name="team"
                      value={formData.team}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="">Sélectionner une équipe</option>
                      <option value="Support Technique">Support Technique</option>
                      <option value="Support Client">Support Client</option>
                      <option value="Ventes">Ventes</option>
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
                    </select>
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
                  onClick={handleCreateUser}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium shadow-sm"
                >
                  Créer l'Utilisateur
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Section */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Liste des Utilisateurs</h2>
          <p className="text-gray-600">Gérez tous les utilisateurs de votre système helpdesk</p>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Utilisateur</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Contact</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Rôle</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Équipe</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Statut</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  {/* User Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.department}</div>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={14} />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} />
                        {user.phone}
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{user.role}</span>
                  </td>

                  {/* Team */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{user.team}</span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === 'Actif' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleToggleStatus(user.id)}
                        className="p-1 text-gray-400 hover:text-orange-600 transition-colors"
                      >
                        <UserX size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}