import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password
      });
      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur inconnue');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form onSubmit={handleRegister} className='w-full max-w-md p-8 bg-white rounded-xl shadow-lg space-y-6'>
        <h2 className='text-2xl font-bold text-center text-gray-800'>Créer un compte</h2>

        <div>
          <label className='block mb-1 text-sm font-medium text-gray-700'>Nom d'utilisateur</label>
          <input type='text' value={username} onChange={e => setUsername(e.target.value)} className='w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500' placeholder='Votre nom d\utilisateur' required /></div>

        <div>
          <label className='block mb-1 text-sm font-medium text-gray-700'>Email</label>
          <input type='email' value={email} onChange={e => setEmail(e.target.value)} className='w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500' placeholder='vous@example.com' required /></div>

        <div>
          <label className='block mb-1 text-sm font-medium text-gray-700'>Mot de passe</label>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} className='w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500' placeholder='••••••••' required /></div>

        <div>
          <label className='block mb-1 text-sm font-medium text-gray-700'>Confirmer le mot de passe</label>
          <input type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className='w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500' placeholder='••••••••' required /></div>

        <button type='submit' className='w-full py-3 text-sm font-bold text-white uppercase rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-700 hover:to-cyan-500 transition-all'>Créer un compte</button>

        {message && <p className='text-sm text-center text-red-500'>{message}</p>}
      </form>
    </div>
  );
}

export default Register;
