'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, User, Mail, MapPin } from 'lucide-react';

interface User {
  idUser: number;
  nom: string;
  prenom: string;
  cin: string;
  email: string;
  password?: string;
  adresse?: string;
  role: string;
}

interface CreateUserForm {
  nom: string;
  prenom: string;
  cin: string;
  email: string;
  password: string;
  adresse: string;
  role: string;
}

const API_URL = 'http://localhost:8080/users';

export default function GestionUtilisateurs() {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<CreateUserForm>({
    nom: '',
    prenom: '',
    cin: '',
    email: '',
    password: '',
    adresse: '',
    role: ''
  });

  const roles = ['admin', 'chef équipe', 'membre équipe','declarant'];

  // Charger les utilisateurs depuis le backend xxxxxxxxxxxxxxxx
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
        setError('');
      } else {
        setError('Erreur lors du chargement des utilisateurs');
      }
    } catch (err) {
      setError('Impossible de se connecter au serveur');
      console.error('Erreur lors du chargement des utilisateurs', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      nom: '',
      prenom: '',
      cin: '',
      email: '',
      password: '',
      adresse: '',
      role: ''
    });
    setShowForm(false);
    setEditingUser(null);
    setError('');
  };

  const handleCreateUser = async () => {
    if (!formData.nom || !formData.prenom || !formData.cin || !formData.email || !formData.password || !formData.role) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        await fetchUsers();
        resetForm();
      } else {
        setError(data.message || 'Erreur lors de la création');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      nom: user.nom,
      prenom: user.prenom,
      cin: user.cin,
      email: user.email,
      password: '', // Ne pas pré-remplir le mot de passe
      adresse: user.adresse || '',
      role: user.role
    });
    setShowForm(true);
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    if (!formData.nom || !formData.prenom || !formData.cin || !formData.email || !formData.role) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);
    try {
      // Créer les données de mise à jour (sans password si vide)
      const updateData = !formData.password || formData.password.trim() === '' 
        ? {
            nom: formData.nom,
            prenom: formData.prenom,
            cin: formData.cin,
            email: formData.email,
            adresse: formData.adresse,
            role: formData.role
          }
        : { ...formData };

      const res = await fetch(`${API_URL}/${editingUser.idUser}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        await fetchUsers();
        resetForm();
      } else {
        setError(data.message || 'Erreur lors de la mise à jour');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (idUser: number, nomComplet: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${nomComplet} ?`)) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${idUser}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (res.ok && data.success) {
        await fetchUsers();
      } else {
        setError(data.message || 'Erreur lors de la suppression');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'chef équipe': return 'bg-blue-100 text-blue-800';
      case 'declarant': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
          <p className="text-gray-600 mt-1">Gérez les utilisateurs de votre système</p>
        </div>
        <button 
          onClick={() => setShowForm(true)} 
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} /> Ajouter un utilisateur
        </button>
      </div>

      {/* Messages d'erreur */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Formulaire de création/modification */}
      {showForm && (
        <div className="mb-6 bg-white p-6 rounded-lg shadow-lg border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {editingUser ? 'Modifier l\'utilisateur' : 'Créer un utilisateur'}
            </h2>
            <button 
              onClick={resetForm} 
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
              <input 
                name="nom" 
                placeholder="Nom de famille" 
                value={formData.nom} 
                onChange={handleInputChange} 
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
              <input 
                name="prenom" 
                placeholder="Prénom" 
                value={formData.prenom} 
                onChange={handleInputChange} 
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CIN *</label>
              <input 
                name="cin" 
                placeholder="Carte d'identité nationale" 
                value={formData.cin} 
                onChange={handleInputChange} 
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input 
                name="email" 
                type="email"
                placeholder="adresse@email.com" 
                value={formData.email} 
                onChange={handleInputChange} 
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe {editingUser ? '(laisser vide pour ne pas changer)' : '*'}
              </label>
              <input 
                name="password" 
                type="password"
                placeholder="Mot de passe" 
                value={formData.password} 
                onChange={handleInputChange} 
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rôle *</label>
              <select 
                name="role" 
                value={formData.role} 
                onChange={handleInputChange} 
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Sélectionner un rôle</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input 
                name="adresse" 
                placeholder="Adresse complète" 
                value={formData.adresse} 
                onChange={handleInputChange} 
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <button 
              onClick={resetForm} 
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button 
              onClick={editingUser ? handleUpdateUser : handleCreateUser} 
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Traitement...' : (editingUser ? 'Mettre à jour' : 'Créer')}
            </button>
          </div>
        </div>
      )}

      {/* Table utilisateurs */}
      <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading && users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    Chargement des utilisateurs...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.idUser} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.prenom} {user.nom}
                          </div>
                          <div className="text-sm text-gray-500">
                            CIN: {user.cin}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {user.email}
                      </div>
                      {user.adresse && (
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {user.adresse}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeClass(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Modifier"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.idUser, `${user.prenom} ${user.nom}`)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistiques */}
      {users.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow border">
          <p className="text-sm text-gray-600">
            Total des utilisateurs: <span className="font-semibold">{users.length}</span>
          </p>
        </div>
      )}
    </div>
  );
}